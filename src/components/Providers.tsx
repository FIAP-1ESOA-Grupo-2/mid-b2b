"use client";

import { store } from "@/redux/store"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'

type Props = {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </SessionProvider>
        </Provider>
    )
}