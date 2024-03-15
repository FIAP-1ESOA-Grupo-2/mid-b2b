"use server"

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

export const getInterests = async () => {
    // Connect prisma client
    const prisma = new PrismaClient()

    const interests = await prisma.interest.findMany({ select: { id: true, title: true } })

    // Disconnect prisma client
    prisma.$disconnect()

    return interests
}

export const getUserInterests = async (userId: number) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    const userInterests = await prisma.userInterest.findMany({
        where: { userId },
        select: { interest: { select: { id: true, title: true } } }
    })

    // Disconnect prisma client
    prisma.$disconnect()

    const interests = userInterests.map((interest) => interest.interest)
    return interests
}

export const createInterest = async (title: string) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    const interestExists = await prisma.interest.findFirst({ where: { title } })

    if (interestExists) {
        // Disconnect prisma client
        prisma.$disconnect()

        return {
            data: interestExists,
            action: 'interest_exists'
        }
    }

    const newInterest = await prisma.interest.create({ data: { title } })

    // Disconnect prisma client
    prisma.$disconnect()

    return {
        data: newInterest,
        action: 'interest_created'
    }
}

export const setUserInterests = async (userId: number, interestId: number | number[]) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    if (Array.isArray(interestId)) {
        interestId.map((id) => setUserInterests(userId, id))
    } else {
        if (await prisma.userInterest.findFirst({ where: { userId, interestId } })) {
            // Disconnect prisma client
            prisma.$disconnect()

            return
        }

        await prisma.userInterest.create({ data: { userId, interestId } })

        // Disconnect prisma client
        prisma.$disconnect()
    }

}
export const deleteUserInterests = async (userId: number) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    await prisma.userInterest.deleteMany({ where: { userId } })

    // Disconnect prisma client
    prisma.$disconnect()
}

export const deleteInterest = async (id: number) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    await prisma.interest.delete({ where: { id } })

    // Disconnect prisma client
    prisma.$disconnect()
}

