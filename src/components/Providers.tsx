"use client";

import { store } from "@/redux/store"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import { Next13ProgressBar } from 'next13-progressbar';

type Props = {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                <Next13ProgressBar height="4px" color="#0a6cff" options={{ showSpinner: true }} showOnShallow />

                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </SessionProvider>
        </Provider>
    )
}