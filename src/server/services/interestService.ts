"use server"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getInterests = async () => {
    const interests = await prisma.interest.findMany()
    return interests
}

export const createInterest = async (title: string) => {
    const interest = await prisma.interest.create({ data: { title } })
    return interest
}

export const deleteInterest = async (id: number) => {
    await prisma.interest.delete({ where: { id } })
}

