"use server"

import { User, UserAccountType } from '@/types/Auth';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

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

    let hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: { name, email, cpf, sector, role, accountType, password: hashedPassword, phoneNumber }
    })

    return { error: '' }
}

export const checkUser = async (email_or_cpf: string, password: string): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email_or_cpf },
                { cpf: email_or_cpf }
            ]
        }
    })

    if (user && await bcrypt.compare(password, user.password)) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone_number: user.phoneNumber,
            sector: user.sector,
            role: user.role,
            accountType: user.accountType as UserAccountType,
            createdAt: user.createdAt
        }
    }

    return null
}

export const deleteUser = async (id: number) => {
    await prisma.user.delete({ where: { id } })
}
