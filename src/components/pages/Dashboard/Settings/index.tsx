"use client";

import { User } from '@/types/Auth';
import { FaAngleRight } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type Props = {
    user: User
}


export const DashboardSettingsPage = ({ user }: Props) => {
    const toast = useToast()

    const handleSignOut = async () => {
        toast({
            title: 'Saindo...',
            description: 'Por favor aguarde',
            status: 'loading',
            duration: 10 * 1000,
            id: 'signout-loading',
            position: 'top-right'
        })

        await signOut()

        toast.close('signout-loading')
        toast({
            title: 'Você foi deslogado...',
            description: 'Volte sempre!',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top-right'
        })
    }

    const items = [
        {
            name: 'Gerenciar notificações',
            href: '/dashboard/settings/notifications',
            colorScheme: 'blue'
        },
        {
            name: 'Minha conta',
            href: '/dashboard/profile',
            colorScheme: 'blue'
        },
        {
            name: 'Termos e condições',
            href: '/dashboard/settings/terms',
            colorScheme: 'blue'
        },
        {
            name: 'Política de privacidade',
            href: '/dashboard/settings/privacy',
            colorScheme: 'blue'
        },
        {
            name: 'Sair',
            onClick: handleSignOut,
            colorScheme: 'red'
        }
    ]

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Configurações</span>
                <p className="text-sm text-slate-500">
                    Acesse as configurações de sua conta e personalize seu perfil!
                </p>
            </div>

            <div className='flex flex-col gap-4 pt-4 pb-8 px-6 lg:px-8'>
                {items.map((item, index) => (
                    item.href ?
                        <Link
                            key={index}
                            href={item.href}
                            className={`w-full flex justify-between items-center cursor-pointer py-3 ${item.colorScheme === 'blue' ? 'hover:text-mainblue' : 'hover:text-red-500'} text-zinc-600 border-b`}
                        >
                            <span className="font-semibold">{item.name}</span>
                            <FaAngleRight size={20} />
                        </Link>
                        :
                        <button
                            key={index}
                            onClick={item.onClick}
                            className={`w-full flex justify-between items-center cursor-pointer py-3 ${item.colorScheme === 'blue' ? 'hover:text-mainblue' : 'hover:text-red-500'} text-zinc-600 outline-none border-b`}
                        >
                            <span className="font-semibold">{item.name}</span>
                            <FaAngleRight size={20} />
                        </button>
                ))}
            </div>
        </div>
    )
}