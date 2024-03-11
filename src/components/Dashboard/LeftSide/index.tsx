"use client";

import { Avatar, Skeleton, SkeletonCircle, useToast } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineOpenInNew } from "react-icons/md";
import Icon1 from '@/assets/images/dashboard-leftside-icon-1.svg';
import Icon2 from '@/assets/images/dashboard-leftside-icon-2.svg';
import Icon3 from '@/assets/images/dashboard-leftside-icon-3.svg';
import Icon4 from '@/assets/images/dashboard-leftside-icon-4.svg';
import { MdHome } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaPowerOff } from "react-icons/fa6";

export const DashboardLeftSide = () => {
    const auth = useSession()
    const pathname = usePathname()
    const toast = useToast()

    const handleSignOut = () => {
        toast({
            title: 'Saindo...',
            description: 'Por favor aguarde',
            status: 'loading',
            duration: 10 * 1000,
            position: 'top-right'
        })

        signOut()
    }

    return (
        <div className="flex flex-col gap-4 mt-8">
            <Link
                href="/dashboard/profile"
                className="flex gap-3 px-7 py-5 bg-white rounded-xl w-80 items-start border shadow-sm border-slate-200 cursor-pointer select-none transition-all hover:bg-slate-50"
            >
                <SkeletonCircle isLoaded={auth.status == 'authenticated'} width={10} height={10}>
                    <Avatar name={auth.data?.user.name} width={10} height={10} />
                </SkeletonCircle>

                <div className="flex-1">
                    <Skeleton isLoaded={auth.status == 'authenticated'} className="w-full flex items-center gap-2 justify-between" height={10}>
                        <div>
                            <span className="text-lg font-bold text-slate-700 truncate max-w-48 block">{auth.data?.user.name}</span>
                            <span className="text-xs text-slate-500 font-semigbold -mt-1 truncate max-w-48 block">{auth.data?.user.email}</span>
                        </div>

                        <div>
                            <MdOutlineOpenInNew className="text-slate-500" size={20} />
                        </div>
                    </Skeleton>
                </div>
            </Link>

            <div className="flex flex-col gap-3 px-7 py-5 bg-white rounded-xl w-80 border shadow-sm border-slate-200">
                <div className="flex gap-3 items-center cursor-pointer p-1 transition-all text-zinc-600 hover:text-mainblue">
                    <Image src={Icon1} alt="icon" />
                    <span className="font-semibold text-sm text-inherit ">Encontre o melhor negócio</span>
                </div>
                <div className="flex gap-3 items-center cursor-pointer p-1 transition-all text-zinc-600 hover:text-mainblue">
                    <Image src={Icon2} alt="icon" />
                    <span className="font-semibold text-sm text-inherit">Encontros agendados</span>
                </div>
                <div className="flex gap-3 items-center cursor-pointer p-1 transition-all text-zinc-600 hover:text-mainblue">
                    <Image src={Icon3} alt="icon" />
                    <span className="font-semibold text-sm text-inherit">Encontros recentes</span>
                </div>
                <div className="flex gap-3 items-center cursor-pointer p-1 transition-all text-zinc-600 hover:text-mainblue">
                    <Image src={Icon4} alt="icon" />
                    <span className="font-semibold text-sm text-inherit">Descobrir novos locais</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 px-7 py-5 bg-white rounded-xl w-80 border shadow-sm border-slate-200">
                <Link
                    href={'/dashboard'}
                    className={`flex gap-2 items-center cursor-pointer p-1 transition-all hover:text-mainblue ${pathname == '/dashboard' ? 'text-mainblue' : 'text-zinc-500'}`}
                >
                    {pathname == '/dashboard' ? <MdHome className="text-mainblue" size={29} /> : <MdOutlineHome className="text-zinc-500" size={29} />}
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
                    className={`flex gap-2 items-center cursor-pointer p-1 transition-all hover:text-mainblue ${pathname == '/dashboard/settings' ? 'text-mainblue' : 'text-zinc-500'}`}
                >
                    {pathname == '/dashboard/settings' ? <MdSettings className="text-mainblue" size={27} /> : <MdOutlineSettings size={27} />}
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
        </div >
    )
}