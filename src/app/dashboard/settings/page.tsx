import { DashboardSettingsPage } from "@/components/pages/Dashboard/Settings"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Configurações',
} satisfies Metadata

const DashboardSettings = async () => {
    const user = await isAuthenticated()

    return (
        <main>
            <DashboardSettingsPage user={user} />
        </main>
    )
}

export default DashboardSettings