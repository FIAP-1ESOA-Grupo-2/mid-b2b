import { Metadata } from "next";
import SignIn from "@/components/pages/SignIn";

export const metadata: Metadata = {
    title: 'Faça seu Login'
}

export default () => {
    return (
        <main>
            <SignIn />
        </main>
    )
}