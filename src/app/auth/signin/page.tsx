import { Metadata } from "next";
import SignIn from "@/components/pages/SignIn";

export const metadata: Metadata = {
    title: 'Faça seu Login'
}

const SignInPage = () => {
    return (
        <main>
            <SignIn />
        </main>
    )
}

export default SignInPage