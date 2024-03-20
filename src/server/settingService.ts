"use server"

import { SettingTypes, SettingValueTypes } from '@/types/Setting'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getSettings = async (userId: number) => {
    const settings = await prisma.userSetting.findMany({ where: { userId }, select: { id: true, setting: true, value: true } })
    return settings
}

export const setSetting = async (userId: number, setting: SettingTypes, value: SettingValueTypes) => {
    const settingExists = await prisma.userSetting.findFirst({ where: { userId, setting } })

    if (settingExists) {
        await prisma.userSetting.update({ where: { id: settingExists.id }, data: { value } })
    } else {
        await prisma.userSetting.create({ data: { userId, setting, value } })
    }
} 