"use server"

import { User, UserAccountType, UserProviders } from '@/types/Auth';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const hasAccountProvider = async ({ provider_id, provider }: { provider_id: string, provider: UserProviders }) => {
    const userProvider = await prisma.userProvider.findFirst({ where: { provider_id, provider }, include: { user: true } })

    if (!userProvider?.user) return { error: 'Conta não encontrada', errorCode: 'ACCOUNT_NOT_FOUND' }

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