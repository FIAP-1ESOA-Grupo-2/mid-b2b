"use client";

import LogoImg from '@/assets/images/logo.svg'
import Image from 'next/image'
import { MdHome, MdMenu } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Tooltip } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { setLeftSidebarDesktopToggle, setLeftSidebarMobileToggle } from '@/redux/reducers/appReducer';

type Props = {
    mode: "mobile" | "desktop"
}

export const DashboardHeader = ({ mode }: Props) => {
    const { leftSidebarOpenDesktop, deviceWidth } = useAppSelector((state) => state.app)

    const dispatch = useAppDispatch()

    const pathname = usePathname()

    const handleToggleLeftSide = () => {
        if (deviceWidth < 1024) {
            dispatch(setLeftSidebarMobileToggle())
        } else {
            dispatch(setLeftSidebarDesktopToggle())
        }
    }

    return (
        <header className="bg-white shadow-sm border-b border-b-slate-200 px-0 sm:px-4 box-content h-16">
            <nav className='flex justify-between items-center max-w-screen-xl mx-auto h-full'>
                {mode == "desktop" &&
                    <Link href='/dashboard'>
                        <Image
                            src={LogoImg}
                            alt="logo"
                            priority
                            height={36}
                        />
                    </Link>
                }

                <div className='flex items-center sm:gap-12 justify-around sm:justify-end w-full'>
                    <Tooltip label='Início' openDelay={700}>
                        <Link
                            href='/dashboard'
                            className={`${pathname === '/dashboard' ? 'text-mainblue' : 'text-gray-600'} transition-all hover:text-mainbluehover`}
                        >
                            {pathname === '/dashboard' ? <MdHome size={31} /> : <MdOutlineHome size={31} />}
                        </Link>
                    </Tooltip>

                    <Tooltip label='Meu perfil' openDelay={700}>
                        <Link
                            href='/dashboard/profile'
                            className={`${pathname === '/dashboard/profile' ? 'text-mainblue' : 'text-gray-600'} transition-all hover:text-mainbluehover`}
                        >
                            {pathname === '/dashboard/profile' ? <BiSolidUser size={28} /> : <BiUser size={28} />}
                        </Link>
                    </Tooltip>

                    <Tooltip label='Encontros' openDelay={700}>
                        <Link
                            href='/dashboard/meetings/in-progress'
                            className={`${pathname.startsWith('/dashboard/meetings/in-progress') ? 'text-mainblue' : 'text-gray-600'} transition-all hover:text-mainbluehover`}
                        >
                            {pathname.startsWith('/dashboard/meetings/in-progress') ? <MdBusinessCenter size={30} /> : <MdOutlineBusinessCenter size={30} />}
                        </Link>
                    </Tooltip>

                    <Tooltip label='Configurações' openDelay={700}>
                        <Link
                            href='/dashboard/settings'
                            className={`${pathname.startsWith('/dashboard/settings') ? 'text-mainblue' : 'text-gray-600'} transition-all hover:text-mainbluehover`}
                        >
                            {pathname.startsWith('/dashboard/settings') ? <MdSettings size={29} /> : <MdOutlineSettings size={29} />}
                        </Link>
                    </Tooltip>

                    <div className='hidden sm:block'>
                        <Tooltip label={leftSidebarOpenDesktop ? 'Fechar menu lateral' : 'Abrir menu lateral'} openDelay={200}>
                            <button
                                onClick={handleToggleLeftSide}
                                className='text-mainblue outline-none transition-all border rounded-md bg-[#e5eefd] p-1 hover:bg-[#d5e4ff]'
                            >
                                <MdMenu size={25} />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </nav>
        </header>
    )

} 