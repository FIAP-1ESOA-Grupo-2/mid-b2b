"use server"

import { PrismaClient } from '@prisma/client'
import { User } from '@/types/Auth'

const prisma = new PrismaClient()

export const createUser = async (
    name: string,
    email: string,
    cpf: string,
    sector: string,
    role: string,
    password: string,
    accountType: "buyer" | "seller",
    phoneNumber?: string,
) => {
    if (await prisma.user.findUnique({ where: { email } })) return;

    await prisma.user.create({
        data: { name, email, cpf, sector, role, accountType, password, phoneNumber }
    })

}
