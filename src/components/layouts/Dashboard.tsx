"use client";

import { DashboardHeader } from "@/components/Dashboard/Header"
import { DashboardLeftSide } from "@/components/Dashboard/LeftSide"
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { setLeftSidebarClose } from "@/redux/reducers/appReducer";
import { User } from "@/types/Auth"
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react'
import { useEffect, useState } from "react";

type Props = {
    user: User,
    children: React.ReactNode
}

export const DashboardLayout = ({ user, children }: Props) => {
    const app = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    const handleCloseLeftSide = () => dispatch(setLeftSidebarClose())

    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Set width initially
        setWidth(window.innerWidth)

        const updateDimensions = () => setWidth(window.innerWidth)

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [])

    return (
        <>
            <div className="flex flex-col h-screen bg-[#F2F3F5]">
                <div className="hidden sm:block">
                    <DashboardHeader mode="desktop" />
                </div>

                <div className="flex-1 overflow-auto">
                    <div className="flex gap-4 mx-auto max-w-screen-xl w-full px-4 xl:px-0  mt-8">
                        <div className={`hidden ${app.leftSidebarOpen ? 'ml-0' : '-ml-[450px] opacity-0'} duration-500  lg:block fixed max-h-[calc(100vh-110px)] pr-1.5 overflow-y-hidden hover:overflow-y-scroll overflow-x-hidden`}>
                            <DashboardLeftSide
                                user={user}
                            />
                        </div>

                        <div className={`flex-1 mb-4 ${app.leftSidebarOpen ? 'lg:ml-80' : 'ml-0'} duration-500  `}>
                            {children}
                        </div>
                    </div>
                </div>

                <div className="block sm:hidden">
                    <DashboardHeader mode="mobile" />
                </div>
            </div>

            {width < 1024 &&
                <Drawer
                    isOpen={app.leftSidebarOpen}
                    placement='right'
                    onClose={handleCloseLeftSide}
                    onEsc={handleCloseLeftSide}
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