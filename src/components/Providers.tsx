"use client";

import { store } from "@/redux/store"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import { Next13ProgressBar } from 'next13-progressbar';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Ably from 'ably';
import { AblyProvider } from 'ably/react';

type Props = {
    children: React.ReactNode
}


export const Providers = ({ children }: Props) => {
    const ablyClient = new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ABLY_API_KEY as string)

    return (
        <AblyProvider client={ablyClient}>
            <Provider store={store}>
                <SessionProvider>
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                        <Next13ProgressBar height="4px" color="#0a6cff" options={{ showSpinner: true }} showOnShallow />

                        <ChakraProvider disableGlobalStyle>
                            {children}
                        </ChakraProvider>
                    </GoogleOAuthProvider>
                </SessionProvider>
            </Provider>
        </AblyProvider>
    )
}