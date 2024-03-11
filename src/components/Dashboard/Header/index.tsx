"use client";

import LogoImg from '@/assets/images/logo.svg'
import Image from 'next/image'
import { MdHome } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
    mode: "mobile" | "desktop"
}

export const DashboardHeader = ({ mode }: Props) => {
    const pathname = usePathname()

    return (
        <header className="bg-white shadow-sm border-b border-b-slate-200 px-0 sm:px-4 xl:px-0 h-16">
            <nav className='flex justify-between items-center max-w-[1380px] mx-auto  h-full'>
                {mode == "desktop" &&
                    <Link href='/dashboard'>
                        <Image
                            src={LogoImg}
                            alt="logo"
                            priority
                        />
                    </Link>
                }

                <div className='flex items-center sm:gap-12  justify-around sm:justify-end w-full'>
                    <Link
                        href='/dashboard'
                        className={`${pathname === '/dashboard' ? 'text-mainblue' : 'text-gray-600'} transition-all hover:text-mainbluehover`}
                    >
                        {pathname === '/dashboard' ? <MdHome size={31} /> : <MdOutlineHome size={31} />}
                    </Link>

                    <button className='text-gray-600 outline-none  hover:text-mainbluehover transition-all' >
                        <MdNotificationsNone size={30} />
                    </button>

                    <Link
                        href='/dashboard/profile'
                        className={`${pathname === '/dashboard/profile' ? 'text-mainblue' : 'text-gray-600'} transition-all hover:text-mainbluehover`}
                    >
                        {pathname === '/dashboard/profile' ? <BiSolidUser size={28} /> : <BiUser size={28} />}
                    </Link>
                    <button className='text-gray-600 outline-none  hover:text-mainbluehover transition-all' >
                        <MdOutlineBusinessCenter size={30} />
                    </button>
                    <button className='text-gray-600 outline-none  hover:text-mainbluehover transition-all' >
                        <MdOutlineSettings size={29} />
                    </button>
                </div>
            </nav>
        </header>
    )

} 