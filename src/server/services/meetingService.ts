"use server"

import { UserAccountType } from "@/types/Auth"
import { PrismaClient } from "@prisma/client"
import moment from 'moment';
import 'moment/locale/pt-br'
const prisma = new PrismaClient()

export const generateMeetings = async (userId: number, userAccountType: UserAccountType) => {
    const userInterests = await prisma.userInterest.findMany({
        where: { userId },
        select: {
            interest: { select: { id: true } }
        }
    })

    const userInterestsIds = userInterests.map((interest) => interest.interest.id)

    const interestsAllUsers = await prisma.userInterest.findMany({
        where: {
            user: {
                id: {
                    not: userId
                },
                accountType: {
                    not: userAccountType
                }
            }
        },
        select: {
            interest: { select: { id: true, title: true } },
            userId: true
        }
    })

    let meetingSuggestions: { userId: number, interests: string[], matchups: number }[] = []

    const allMeetingSuggestions = await prisma.meetingSuggestion.findMany({ select: { from_user_id: true, to_user_id: true } })

    userInterestsIds.forEach((interestId) => {
        const matchupExists = interestsAllUsers.find((user) => user.interest.id === interestId)

        if (
            matchupExists &&
            !(allMeetingSuggestions.find((suggestion) => (suggestion.from_user_id === userId && suggestion.to_user_id === matchupExists.userId)
                || (suggestion.from_user_id === matchupExists.userId && suggestion.to_user_id === userId)))
        ) {
            const meetingSuggestion = meetingSuggestions.find((suggestion) => suggestion.userId === matchupExists.userId)

            if (meetingSuggestion) {
                meetingSuggestion.interests.push(matchupExists.interest.title)
                meetingSuggestion.matchups++
            } else {
                meetingSuggestions.push({
                    userId: matchupExists.userId,
                    interests: [matchupExists.interest.title],
                    matchups: 1
                })
            }
        }
    })

    const meetings = meetingSuggestions.sort(function (a, b) {
        return b.matchups - a.matchups
    }).slice(0, 20 - allMeetingSuggestions.filter((suggestion) => suggestion.from_user_id === userId || suggestion.to_user_id === userId).length)


    await prisma.meetingSuggestion.createMany({
        data: meetings.map((meeting) => ({
            from_user_id: userId,
            to_user_id: meeting.userId,
            interests: meeting.interests.join(', '),
            matchups: meeting.matchups,
            createdAt: moment().toDate()
        })),
    })

    const newMeetingsSuggestions = await prisma.meetingSuggestion.findMany({ where: { OR: [{ from_user_id: userId }, { to_user_id: userId }] } })
    newMeetingsSuggestions.forEach((meeting) => {
        // @ts-ignore
        meeting.createdAt = moment(meeting.createdAt).calendar()
    })

    return newMeetingsSuggestions;
}