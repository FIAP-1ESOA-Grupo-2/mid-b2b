"use client";

import { store } from "@/redux/store"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"

type Props = {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}