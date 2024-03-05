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
): Promise<{ error?: string }> => {
    if (await prisma.user.findUnique({ where: { email } })) {
        return {
            error: 'Email já está sendo usado.'
        }
    };

    await prisma.user.create({
        data: { name, email, cpf, sector, role, accountType, password, phoneNumber }
    })

    return { error: '' }
}

export const deleteUser = async () => {

}