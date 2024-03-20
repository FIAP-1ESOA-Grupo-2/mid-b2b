"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getMeetings = async (userId: number) => {
    const meetings = await prisma.meeting.findMany({
        where: {
            OR: [
                { from_user_id: userId },
                { to_user_id: userId }
            ]
        },
        select: {
            id: true,
            from_user_id: true,
            to_user_id: true,
            date: true,
            interests: true,
            matchups: true,
            closed: true,
            local: true
        }
    })

    return meetings
}

export const getMeeting = async (id: string, userId: number) => {
    const meetingID = parseInt(id)

    if (!meetingID) return { error: 'meeting_not_found' }

    const meeting = await prisma.meeting.findFirst({ where: { id: meetingID, OR: [{ from_user_id: userId }, { to_user_id: userId }] } })

    if (!meeting) return { error: 'meeting_not_found' }

    return { data: meeting }
}