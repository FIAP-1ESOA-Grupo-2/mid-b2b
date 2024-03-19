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

    const meetingInterestsExclude = await prisma.meeting.findMany({ where: { OR: [{ from_user_id: userId }, { to_user_id: userId }] }, select: { from_user_id: true, to_user_id: true } })
    const userIdsExlcude = meetingInterestsExclude.map((meeting) => meeting.from_user_id === userId ? meeting.to_user_id : meeting.from_user_id)

    const interestsAllUsers = await prisma.userInterest.findMany({
        where: {
            user: {
                id: {
                    notIn: [...userIdsExlcude, userId]
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

    const allMeetingSuggestions = await prisma.meetingSuggestion.findMany({ select: { from_user_id: true, to_user_id: true, refused: true } })

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
    }).slice(0, 20 - allMeetingSuggestions.filter((suggestion) => (suggestion.from_user_id === userId || suggestion.to_user_id === userId) && !suggestion.refused).length)

    await prisma.meetingSuggestion.createMany({
        data: meetings.map((meeting) => ({
            from_user_id: userId,
            to_user_id: meeting.userId,
            interests: meeting.interests.join(', '),
            matchups: meeting.matchups,
            createdAt: moment().toDate()
        })),
    })

    const newMeetingsSuggestions = await prisma.meetingSuggestion.findMany({ where: { OR: [{ from_user_id: userId }, { to_user_id: userId }], refused: false } })
    newMeetingsSuggestions.forEach((meeting) => {
        // @ts-ignore
        meeting.createdAt = moment(meeting.createdAt).calendar()
    })

    return newMeetingsSuggestions;
}

export const getMeetingSuggestion = async (id: number) => {
    const meetingSuggestion = await prisma.meetingSuggestion.findFirst({ where: { id, refused: false } })
    return meetingSuggestion
}

export const acceptMeetingSuggestion = async (id: number, userId: number) => {
    if (await prisma.meetingSuggestion.findFirst({ where: { id, from_user_id: userId } })) {
        await prisma.meetingSuggestion.update({ where: { id, from_user_id: userId }, data: { from_user_accepted: true } })
    }

    if (await prisma.meetingSuggestion.findFirst({ where: { id, to_user_id: userId } })) {
        await prisma.meetingSuggestion.update({ where: { id, to_user_id: userId }, data: { to_user_accepted: true } })
    }

    const meetingSuggestion = await prisma.meetingSuggestion.findFirst({ where: { id, from_user_accepted: true, to_user_accepted: true } })
    if (meetingSuggestion) {
        // Delete meeting suggestion
        await prisma.meetingSuggestion.delete({ where: { id: meetingSuggestion.id } })

        // Create a meeting
        await prisma.meeting.create({
            data: {
                matchups: meetingSuggestion.matchups,
                interests: meetingSuggestion.interests,
                from_user_id: meetingSuggestion.from_user_id,
                to_user_id: meetingSuggestion.to_user_id,
                createdAt: moment().toDate()
            }
        })

        return { action: 'new_meeting' }
    }

    return { action: 'accepted' }
}

export const rejectMeetingSuggestion = async (id: number) => {
    if (await prisma.meetingSuggestion.findFirst({ where: { id } })) {
        await prisma.meetingSuggestion.update({ where: { id }, data: { refused: true } })
    }
}