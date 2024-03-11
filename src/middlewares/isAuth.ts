import { authConfig } from "@/config/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const isAuthenticated = async () => {
    const auth = await getServerSession(authConfig)

    if (!auth?.user) {
        redirect('/auth/signin')
    }

    return auth.user
}