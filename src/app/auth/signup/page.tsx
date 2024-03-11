import SignUp from "@/components/pages/Auth/SignUp";
import { isUnauthenticated } from "@/middlewares/isNotAuth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Crie sua conta'
}

const SignUpPage = async () => {
    await isUnauthenticated()

    return (
        <main>
            <SignUp />
        </main>
    )
}

export default SignUpPage