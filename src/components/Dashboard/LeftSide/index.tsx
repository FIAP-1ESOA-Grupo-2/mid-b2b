"use client";

import { Avatar, Skeleton, SkeletonCircle, useToast } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MdAdd, MdOutlineOpenInNew } from "react-icons/md";
import Icon1 from '@/assets/images/dashboard-leftside-icon-1.svg';
import Icon2 from '@/assets/images/dashboard-leftside-icon-2.svg';
import Icon3 from '@/assets/images/dashboard-leftside-icon-3.svg';
import Icon4 from '@/assets/images/dashboard-leftside-icon-4.svg';
import { MdHome } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaPowerOff } from "react-icons/fa6";
import { User } from "@/types/Auth";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LeftSideCalendar } from "./Calendar";

type Props = {
    user: User
}

export const DashboardLeftSide = ({ user }: Props) => {
    const pathname = usePathname()
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

    return (
        <div className="flex flex-col gap-5 mb-14 w-72">
            <Link
                href="/dashboard/profile"
                className="flex gap-3 p-5 bg-white rounded-xl items-start border shadow-sm border-slate-200 cursor-pointer select-none transition-all hover:bg-slate-50"
            >
                <Avatar name={user.name} />

                <div className="flex-1">
                    <div className="w-full flex items-center gap-2 justify-between">
                        <div>
                            <span className="text-lg font-bold text-slate-700 truncate max-w-40 block">{user.name}</span>
                            <span className="text-xs text-slate-500 font-semigbold -mt-1 truncate max-w-40 block">{user.email}</span>
                        </div>

                        <div>
                            <MdOutlineOpenInNew className="text-slate-500" size={20} />
                        </div>
                    </div>
                </div>
            </Link>

            <div className="flex flex-col gap-3 bg-white rounded-xl border shadow-sm border-slate-200 p-2 h-72 ">
                <LeftSideCalendar />
            </div>

            <div className="flex flex-col gap-3 px-6 py-5 bg-white rounded-xl border shadow-sm border-slate-200">
                <Link
                    href='/dashboard/meetings/suggestions'
                    className={`${pathname == '/dashboard/meetings/suggestions' ? 'text-mainblue' : 'text-zinc-600'} flex gap-3 items-center cursor-pointer p-1 transition-all hover:text-mainblue`}
                >
                    <Image src={Icon1} alt="icon" />
                    <span className="font-semibold text-sm text-inherit">Encontre o melhor negócio</span>
                </Link>
                <Link
                    href='/dashboard/meetings/in-progress'
                    className={`${pathname == '/dashboard/meetings/in-progress' ? 'text-mainblue' : 'text-zinc-600'} flex gap-3 items-center cursor-pointer p-1 transition-all hover:text-mainblue`}
                >
                    <Image src={Icon3} alt="icon" />
                    <span className="font-semibold text-sm text-inherit">Encontros em andamento</span>
                </Link>
                <Link
                    href='/dashboard/meetings/closed'
                    className={`${pathname == '/dashboard/meetings/closed' ? 'text-mainblue' : 'text-zinc-600'} flex gap-3 items-center cursor-pointer p-1 transition-all hover:text-mainblue`}
                >
                    <Image src={Icon4} alt="icon" />
                    <span className="font-semibold text-sm text-inherit">Encontros encerrados</span>
                </Link>

                {/* 
                <Link
                    href='/dashboard/meetings/schedule'
                    className={`${pathname == '/dashboard/meetings/schedule' ? 'text-mainblue' : 'text-zinc-600'} flex gap-3 items-center cursor-pointer p-1 transition-all hover:text-mainblue`}
                >
                    <Image src={Icon2} alt="icon" />
                    <span className="font-semibold text-sm text-inherit">Encontros agendados</span>
                </Link>
        */}
            </div>

            <div className="flex flex-col gap-3 px-6 py-5 bg-white rounded-xl border shadow-sm border-slate-200">
                <Link
                    href={'/dashboard'}
                    className={`flex gap-2 items-center cursor-pointer p-1 transition-all hover:text-mainblue ${pathname == '/dashboard' ? 'text-mainblue' : 'text-zinc-500'}`}
                >
                    {pathname == '/dashboard' ? <MdHome className="text-mainblue" size={29} /> : <MdOutlineHome size={29} />}
                    <span className="font-semibold text-sm text-inherit mt-0.5">Início</span>
                </Link>
                <Link
                    href={'/dashboard/interests'}
                    className={`flex gap-2 items-center cursor-pointer p-1 transition-all hover:text-mainblue ${pathname == '/dashboard/interests' ? 'text-mainblue' : 'text-zinc-500'}`}
                >
                    {pathname == '/dashboard/interests' ? <MdBusinessCenter className="text-mainblue" size={28} /> : <MdOutlineBusinessCenter size={28} />}
                    <span className="font-semibold text-sm text-inherit mt-1">Gerenciar interesses</span>
                </Link>
                <Link
                    href={'/dashboard/profile'}
                    className={`flex gap-2 items-center cursor-pointer p-1 transition-all hover:text-mainblue ${pathname == '/dashboard/profile' ? 'text-mainblue' : 'text-zinc-500'}`}
                >
                    {pathname == '/dashboard/profile' ? <BiSolidUser className="text-mainblue" size={27} /> : <BiUser size={27} />}
                    <span className="font-semibold text-sm text-inherit mt-1">Perfil</span>
                </Link>
                <Link
                    href={'/dashboard/settings'}
                    className={`flex gap-2 items-center cursor-pointer p-1 transition-all hover:text-mainblue ${pathname.startsWith('/dashboard/settings') ? 'text-mainblue' : 'text-zinc-500'}`}
                >
                    {pathname.startsWith('/dashboard/settings') ? <MdSettings className="text-mainblue" size={27} /> : <MdOutlineSettings size={27} />}
                    <span className="font-semibold text-sm text-inherit mt-0.5">Configurações</span>
                </Link>
                <button
                    onClick={handleSignOut}
                    className={`flex gap-2 items-center cursor-pointer p-1 transition-all hover:text-red-500 text-zinc-500  outline-none`}
                >
                    <FaPowerOff size={21} className="ml-0.5" />
                    <span className="font-semibold text-sm text-inherit mt-0.5 ml-1">Sair</span>
                </button>
            </div>
        </div>
    )
}