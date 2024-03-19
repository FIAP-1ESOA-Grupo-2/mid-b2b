"use client";

import { DashboardHeader } from "@/components/Dashboard/Header"
import { DashboardLeftSide } from "@/components/Dashboard/LeftSide"
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { setDeviceWidth, setLeftSidebarMobileToggle } from "@/redux/reducers/appReducer";
import { User } from "@/types/Auth"
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react'
import { useEffect } from "react";
import LogoImg from '@/assets/images/logo.svg'
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { DrawerNotifications } from "../Dashboard/DrawerNotifications";
import { generateMeetings } from "@/server/services/meetingService";
import { setInitLoaded, setLoading, setMeetingSuggestions } from "@/redux/reducers/meetingSuggestionsReducer";

type Props = {
    user: User,
    children: React.ReactNode
}

export const DashboardLayout = ({ user, children }: Props) => {
    const app = useAppSelector((state) => state.app)
    const { meetingSuggestions, initLoaded } = useAppSelector(state => state.meetingSuggestions)

    const dispatch = useAppDispatch()

    const handleToggleLeftSideMobile = () => dispatch(setLeftSidebarMobileToggle())
    const handleSetDeviceWidth = (width: number) => dispatch(setDeviceWidth(width))

    const handleGetMeetingsSuggestions = async () => {
        if (initLoaded) return;

        const response = await generateMeetings(user.id, user.accountType)
        console.log(response)
        dispatch(setMeetingSuggestions(response))
        dispatch(setInitLoaded(true))
        dispatch(setLoading(false))
    }

    useEffect(() => {
        // Set width initially
        handleSetDeviceWidth(window.innerWidth)

        const updateDimensions = () => handleSetDeviceWidth(window.innerWidth)

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [])

    useEffect(() => { handleGetMeetingsSuggestions() }, [])

    return (
        <>
            <div className="flex flex-col bg-[#F2F3F5] h-screen w-screen">
                <div className="hidden sm:block">
                    <DashboardHeader mode="desktop" />
                </div>

                <div className="flex justify-between items-center px-4 sm:hidden bg-white h-16 shadow-sm border-b border-b-slate-200 ">
                    <Link href='/dashboard'>
                        <Image src={LogoImg} alt="logo" priority height={34} />
                    </Link>

                    <button
                        onClick={handleToggleLeftSideMobile}
                        className='text-mainblue outline-none transition-all border rounded-md bg-[#e5eefd] p-1 hover:bg-[#d5e4ff]'
                    >
                        <MdMenu size={25} />
                    </button>
                </div>

                <div className="overflow-hidden sm:overflow-auto flex-1 sm:scroll-pt-4">
                    <div className="p-5 xl:p-0 sm:py-5 xl:py-5 sm:max-w-screen-xl mx-auto">
                        <div className={`hidden ${app.leftSidebarOpenDesktop ? 'ml-0' : '-ml-[400px] opacity-0 pointer-events-none'} duration-500  lg:block fixed pr-1.5 overflow-y-hidden hover:overflow-y-scroll overflow-x-hidden h-[calc(100vh-84px)] z-10`}>
                            <DashboardLeftSide
                                user={user}
                            />
                        </div>

                        <div className={`${app.leftSidebarOpenDesktop ? 'lg:ml-[19rem]' : 'lg:ml-0'} lg:duration-500`}>
                            {children}
                        </div>
                    </div>
                </div>

                <div className="block sm:hidden">
                    <DashboardHeader mode="mobile" />
                </div>
            </div>

            <DrawerNotifications
                user={user}
            />

            {app.deviceWidth < 1024 &&
                <Drawer
                    isOpen={app.leftSidebarOpenMobile}
                    placement='right'
                    onClose={handleToggleLeftSideMobile}
                    onEsc={handleToggleLeftSideMobile}
                >
                    <DrawerOverlay />
                    <DrawerContent >
                        <DrawerCloseButton />
                        <DrawerHeader>Menu de navegação</DrawerHeader>

                        <DrawerBody style={{ overflowY: 'auto', overflowX: 'hidden', padding: '0 16px' }}>
                            <DashboardLeftSide
                                user={user}
                            />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            }
        </>

    )
}