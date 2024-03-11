import { Metadata } from "next";
import SignIn from "@/components/pages/Auth/SignIn";
import { isUnauthenticated } from "@/middlewares/isNotAuth";

export const metadata: Metadata = {
    title: 'Faça seu Login'
}

const SignInPage = async () => {
    await isUnauthenticated()

    return (
        <main>
            <SignIn />
        </main>
    )
}

export default SignInPage