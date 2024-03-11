import { Metadata } from "next";
import ForgotPassword from "@/components/pages/Auth/ForgotPassword";

export const metadata: Metadata = {
    title: 'Esqueci minha senha'
}

const ForgotPasswordPage = () => {
    return (
        <main>
            <ForgotPassword />
        </main>
    )
}

export default ForgotPasswordPage