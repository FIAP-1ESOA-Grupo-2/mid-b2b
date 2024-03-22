"use server";

import { MeetingMessage } from "@/types/Meeting";
import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import 'moment/locale/pt-br'
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient()

export const getMeetings = async (userId: number) => {
    const meetings = await prisma.meeting.findMany({
        where: {
            closed: false,
            OR: [
                { from_user_id: userId },
                { to_user_id: userId }
            ]
        }
    })

    return meetings
}

export const getMeetingsClosed = async (userId: number) => {
    const meetings = await prisma.meeting.findMany({
        where: {
            OR: [
                { from_user_id: userId },
                { to_user_id: userId }
            ],
            closed: true
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

export const updateMeeting = async (id: number, data: any) => {
    const meeting = await prisma.meeting.update({ where: { id }, data })
    return meeting
}

export const getMeetingMessages = async (meetingId: number) => {
    const messages = await prisma.meetingMessage.findMany({ where: { meetingId }, select: { id: true, body: true, userId: true, createdAt: true, type: true } })
    return messages
}

export const sendMessage = async (meetingId: number, userId: number, body: string, type: MeetingMessage['type'] = 'text') => {
    const message = await prisma.meetingMessage.create({ data: { meetingId, userId, body, createdAt: moment().unix().toString(), type } })
    return message
}

export const getMeetingsScheduled = async (userId: number, month: number, year: number) => {
    const meetings = await prisma.meeting.findMany({
        where:
        {
            OR: [{ from_user_id: userId }, { to_user_id: userId }],
            closed: false,
            date: { contains: `${year}-${month.toString().padStart(2, '0')}` }
        }
    })

    return meetings
}