import { DashboardSettingsNotificationsPage } from "@/components/pages/Dashboard/Settings/Notifications"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Gerenciar notificações',
} satisfies Metadata

const DashboardSettingsNotifications = async () => {
    const user = await isAuthenticated()

    return (
        <main>
            <DashboardSettingsNotificationsPage
                user={user}
            />
        </main>
    )
}

export default DashboardSettingsNotifications