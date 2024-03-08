"use server"

import { mailConfig } from '@/config/mail';
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
) => {
    if (await prisma.user.findUnique({ where: { email } })) {
        return { error: 'Email já está sendo usado.', errorCode: 'EMAIL_ALREADY_IN_USE' }
    };

    if (await prisma.user.findUnique({ where: { cpf } })) {
        return { error: 'CPF já está sendo usado.', errorCode: 'CPF_ALREADY_IN_USE' }
    };

    let hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { name, email, cpf, sector, role, accountType, password: hashedPassword, phoneNumber },
        select: { id: true }
    })

    return { data: newUser }
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

export const sendEmailVerification = async (email: string) => {
    const token = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`

    if (await prisma.emailVerification.findUnique({ where: { email } })) {
        await prisma.emailVerification.update({ where: { email }, data: { token } })
    } else {
        await prisma.emailVerification.create({ data: { email, token } })
    }

    await mailConfig.sendMail({
        from: '"Mid B2B" <renatoalmeida727261@gmail.com>',
        to: email,
        subject: "Confirmação de email ✔",
        text: `Olá, tudo bem? Aqui está o código de verificação solicitado para ativar sua conta: ${token}`, // plain text body
        html: "Olá, tudo bem? Aqui está o código de verificação solicitado para ativar sua conta: <b>" + token + "</b>", // html body
    });
}

export const checkEmailVerification = async (email: string, token: string) => {
    const emailVerification = await prisma.emailVerification.findUnique({ where: { email, token } })

    if (emailVerification) {
        await prisma.emailVerification.delete({ where: { email } })
        return true
    }

    return false
}