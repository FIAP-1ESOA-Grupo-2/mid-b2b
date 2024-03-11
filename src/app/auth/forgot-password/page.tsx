import { Metadata } from "next";
import ForgotPassword from "@/components/pages/Auth/ForgotPassword";
import { isUnauthenticated } from "@/middlewares/isNotAuth";

export const metadata: Metadata = {
    title: 'Esqueci minha senha'
}

const ForgotPasswordPage = async () => {
    await isUnauthenticated()

    return (
        <main>
            <ForgotPassword />
        </main>
    )
}

export default ForgotPasswordPage