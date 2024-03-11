import SignUp from "@/components/pages/Auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Crie sua conta'
}

const SignUpPage = () => {
    return (
        <main>
            <SignUp />
        </main>
    )
}

export default SignUpPage