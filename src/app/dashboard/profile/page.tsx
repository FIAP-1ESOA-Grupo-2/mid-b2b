import { DashboardProfilePage } from "@/components/pages/Dashboard/Profile"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Meu Perfil',
} satisfies Metadata

const DashboardProfile = async () => {
    const user = await isAuthenticated()

    return (
        <main>
            <DashboardProfilePage
                user={user}
            />
        </main>
    )
}

export default DashboardProfile