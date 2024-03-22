"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createFeedback = async (userId: number, amount: number) => {
    const feedback = prisma.userFeedback.create({ data: { userId, amount } })
    return feedback
}