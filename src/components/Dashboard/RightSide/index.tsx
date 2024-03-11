"use client";

import { useToast } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaPowerOff } from "react-icons/fa6";
import { User } from "@/types/Auth";

type Props = {
    user: User
}

export const DashboardRightSide = ({ user }: Props) => {
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

        signOut({ callbackUrl: '/' })
    }

    return (
        <div className="flex flex-col gap-4 mb-14 w-72">
            <div className="flex flex-col gap-3 px-6 py-5 bg-white rounded-xl border shadow-sm border-slate-200">
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
        </div>
    )
}