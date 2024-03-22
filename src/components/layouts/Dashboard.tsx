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
import { generateMeetings, getMeetingSuggestion } from "@/server/meetingSuggestionService";
import { setInitLoaded, setLoading, setMeetingSuggestions } from "@/redux/reducers/meetingSuggestionsReducer";
import { setLoading as setLoadingMeetings } from "@/redux/reducers/meetingsReducer";
import { useChannel } from 'ably/react';
import moment from "moment";
import { setMeetings } from "@/redux/reducers/meetingsReducer";
import { getMeetings } from "@/server/meetingService";
import { Meeting } from "@/types/Meeting";

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

        dispatch(setMeetingSuggestions(response))
        dispatch(setInitLoaded(true))
        dispatch(setLoading(false))
    }

    // Realtime update meetings suggestions
    const { channel } = useChannel('meetings-suggestions', `meeting-suggestion-update-per-${user.id}`, async (message) => {
        if (message.data.action === 'rejected' || message.data.action === 'new_meeting') {
            dispatch(setMeetingSuggestions(meetingSuggestions.filter((data) => data.id !== message.data.id)))
            return;
        }

        if (message.data.action === 'new_meeting') {
            dispatch(setLoadingMeetings(true))
            dispatch(setMeetings(await getMeetings(user.id)))
            dispatch(setLoadingMeetings(false))
            return;
        }

        const meetingSuggestionUpdated = await getMeetingSuggestion(message.data.id)
        const meetingSuggestionsUpdated = meetingSuggestions.map((data) => data.id === message.data.id ? { ...meetingSuggestionUpdated, createdAt: moment(meetingSuggestionUpdated?.createdAt).calendar() } : data)

        // @ts-ignore
        dispatch(setMeetingSuggestions(meetingSuggestionsUpdated))
    });

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
                    <div className="flex-1 p-4 w-full h-full overflow-auto sm:h-auto sm:overflow-hidden scroll-pt-4 sm:p-0 sm:py-4 sm:px-4 xl:px-2 sm:max-w-screen-xl sm:mx-auto">
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