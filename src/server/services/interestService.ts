"use server"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getInterests = async () => {
    const interests = await prisma.interest.findMany({ select: { id: true, title: true } })
    return interests
}

export const getUserInterests = async (userId: number) => {
    const userInterests = await prisma.userInterest.findMany({
        where: { userId },
        select: { interest: { select: { id: true, title: true } } }
    })

    const interests = userInterests.map((interest) => interest.interest)
    return interests
}

export const createInterest = async (title: string) => {
    const interestExists = await prisma.interest.findFirst({ where: { title } })
    if (interestExists) return {
        data: interestExists,
        action: 'interest_exists'
    }

    const newInterest = await prisma.interest.create({ data: { title } })
    return {
        data: newInterest,
        action: 'interest_created'
    }
}

export const setUserInterests = async (userId: number, interestId: number | number[]) => {
    if (Array.isArray(interestId)) {
        interestId.map((id) => setUserInterests(userId, id))
    } else {
        if (await prisma.userInterest.findFirst({ where: { userId, interestId } })) return

        await prisma.userInterest.create({ data: { userId, interestId } })
    }

}
export const deleteUserInterests = async (userId: number) => {
    await prisma.userInterest.deleteMany({ where: { userId } })
}

export const deleteInterest = async (id: number) => {
    await prisma.interest.delete({ where: { id } })
}

