"use client";

import { Progress, Switch, useToast } from '@chakra-ui/react'
import { User } from "@/types/Auth";
import { ChangeEvent, useEffect, useState } from 'react';
import { SettingTypes } from '@/types/Setting';
import { getSettings, setSetting } from '@/server/services/settingService';
import Link from 'next/link';
import { HiArrowSmLeft } from 'react-icons/hi';

type Props = {
    user: User
}

export const DashboardSettingsNotificationsPage = ({ user }: Props) => {
    const [loading, setLoading] = useState(true)
    const [checkedWeb, setCheckedWeb] = useState(true)
    const [checkedEmail, setCheckedEmail] = useState(true)
    const [checkedUnreadIndicator, setCheckedUnreadIndicator] = useState(true)

    const toast = useToast()

    const handleGetSettings = async () => {
        setLoading(true)
        const settings = await getSettings(user.id)
        setLoading(false)

        setCheckedWeb(settings.find((setting) => setting.setting === 'notify_scheduled_meetings_web')?.value === 'true')
        setCheckedEmail(settings.find((setting) => setting.setting === 'notify_scheduled_meetings_email')?.value === 'true')
        setCheckedUnreadIndicator(settings.find((setting) => setting.setting === 'unread_notification_indicator')?.value === 'true')
    }

    const handleOnChange = async (notificationType: SettingTypes, event: ChangeEvent<HTMLInputElement>) => {
        if (notificationType === 'notify_scheduled_meetings_web') {
            setCheckedWeb(event.target.checked)
        } else if (notificationType === 'notify_scheduled_meetings_email') {
            setCheckedEmail(event.target.checked)
        } else if (notificationType === 'unread_notification_indicator') {
            setCheckedUnreadIndicator(event.target.checked)
        }

        setLoading(true)
        await setSetting(user.id, notificationType, event.target.checked ? 'true' : 'false')
        setLoading(false)

        toast({
            title: 'Sucesso ao salvar configuração!',
            description: 'Suas preferências foram atualizadas!',
            status: 'success',
            position: 'top-right',
            duration: 3000,
            isClosable: true
        })
    }

    useEffect(() => {
        handleGetSettings()
    }, [])

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8 flex gap-4 items-center">
                <Link className="" href="/dashboard/settings">
                    <HiArrowSmLeft className="text-slate-600 duration-200 cursor-pointer hover:text-mainblue" size={24} />
                </Link>

                <div>
                    <span className="text-xl font-bold text-slate-700">Notificações de uso</span>
                    <p className="text-sm text-slate-500">
                        Acesse e gerencie suas preferências de notificações!
                    </p>
                </div>
            </div>

            {loading &&
                <Progress size='xs' isIndeterminate />
            }

            <div className="flex flex-col gap-6 pt-5 pb-7 px-4 lg:px-8">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <span className="text-md font-semibold text-slate-900">Ativar notificações de reuniões (Web)</span>
                        <p className="text-[13px] text-gray-600 text-justify">Permite que você receba uma notificação na web quando uma reunião está se aproximando.</p>
                    </div>

                    <Switch
                        id='web-alerts'
                        onChange={e => handleOnChange('notify_scheduled_meetings_web', e)}
                        isDisabled={loading}
                        isChecked={checkedWeb}
                    />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <span className="text-md font-semibold text-slate-900">Ativar notificações de reuniões (Email)</span>
                        <p className="text-[13px] text-gray-600 text-justify">Permite que você recebe um e-mail quando uma reunião está se aproximando.</p>
                    </div>

                    <Switch
                        id='email-alerts'
                        onChange={e => handleOnChange('notify_scheduled_meetings_email', e)}
                        isDisabled={loading}
                        isChecked={checkedEmail}
                    />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <span className="text-md font-semibold text-slate-900">Ativar indicador de mensagens não lidas</span>
                        <p className="text-[13px] text-gray-600 text-justify">Mostra um indicador vermelho no ícone de notificações quando houver mensagens não lidas</p>
                    </div>

                    <Switch
                        id='unread-messages'
                        onChange={e => handleOnChange('unread_notification_indicator', e)}
                        isDisabled={loading}
                        isChecked={checkedUnreadIndicator}
                    />
                </div>
            </div>
        </div>
    )
}