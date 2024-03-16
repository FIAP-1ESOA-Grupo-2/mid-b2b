"use client";

import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"
import { DashboardLeftSide } from "../LeftSide"
import { User } from "@/types/Auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { setDrawerOpen } from "@/redux/reducers/notificationsReducer";

type Props = {
    user: User
}

export const DrawerNotifications = ({ user }: Props) => {
    const { drawerOpen, initLoaded, notifications } = useAppSelector(state => state.notifications)

    const dispatch = useAppDispatch()

    const handleToggleDrawer = () => {
        dispatch(setDrawerOpen(!drawerOpen))
    }

    return (
        <div>
            <Drawer
                isOpen={drawerOpen}
                placement='right'
                onClose={handleToggleDrawer}
                onEsc={handleToggleDrawer}
            >
                <DrawerOverlay />
                <DrawerContent >
                    <DrawerCloseButton />
                    <DrawerHeader>Notificações</DrawerHeader>

                    <DrawerBody style={{ overflowY: 'auto', overflowX: 'hidden', padding: '0 16px' }}>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}