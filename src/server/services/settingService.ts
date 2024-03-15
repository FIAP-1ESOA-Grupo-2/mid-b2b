"use server"

import { SettingTypes, SettingValueTypes } from '@/types/Setting'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

export const getSettings = async (userId: number) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    const settings = await prisma.userSetting.findMany({ where: { userId }, select: { id: true, setting: true, value: true } })

    // Disconnect prisma client
    prisma.$disconnect()

    return settings
}

export const setSetting = async (userId: number, setting: SettingTypes, value: SettingValueTypes) => {
    // Connect prisma client
    const prisma = new PrismaClient()

    const settingExists = await prisma.userSetting.findFirst({ where: { userId, setting } })

    if (settingExists) {
        await prisma.userSetting.update({ where: { id: settingExists.id }, data: { value } })
    } else {
        await prisma.userSetting.create({ data: { userId, setting, value } })
    }

    // Disconnect prisma client
    prisma.$disconnect()
} 