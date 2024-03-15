"use server"

import { User, UserAccountType, UserProviders } from '@/types/Auth';
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
  
export const hasAccountProvider = async ({ provider_id, provider }: { provider_id: string, provider: UserProviders }) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    const userProvider = await prisma.userProvider.findFirst({ where: { provider_id, provider }, include: { user: true } })

    if (!userProvider?.user) {
        // Disconnect prisma client
        prisma.$disconnect()

        return { error: 'Conta não encontrada', errorCode: 'ACCOUNT_NOT_FOUND' }
    }

    // Disconnect prisma client
    prisma.$disconnect()

    const user: User = {
        id: userProvider.user.id,
        name: userProvider.user.name,
        email: userProvider.user.email,
        cpf: userProvider.user.cpf,
        phone_number: userProvider.user.phoneNumber,
        sector: userProvider.user.sector,
        role: userProvider.user.role,
        accountType: userProvider.user.accountType as UserAccountType,
        createdAt: userProvider.user.createdAt
    }

    return { data: user }
}

export const createAccountProvider = async ({ user_id, provider_id, provider }: { user_id: number, provider_id: string, provider: UserProviders }) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    if (await prisma.userProvider.findFirst({ where: { provider_id, provider } })) {
        // Disconnect prisma client
        prisma.$disconnect()

        return { error: 'Conta ja conectada com este provedor', errorCode: 'ACCOUNT_ALREADY_EXISTS' }
    }

    const newUserProvider = await prisma.userProvider.create({ data: { userId: user_id, provider_id, provider } })

    // Disconnect prisma client
    prisma.$disconnect()

    return { data: newUserProvider }
}