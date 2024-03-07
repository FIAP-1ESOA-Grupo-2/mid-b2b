import SignUp from "@/components/pages/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Crie sua conta'
}

export default () => {
    return (
        <main>
            <SignUp />
        </main>
    )
}