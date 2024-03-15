import { DashboardSettingsPrivacyPage } from "@/components/pages/Dashboard/Settings/Privacy"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Politica de Privacidade',
} satisfies Metadata

const DashboardSettingsPrivacy = async () => {
    await isAuthenticated()

    return (
        <main>
            <DashboardSettingsPrivacyPage />
        </main>
    )
}

export default DashboardSettingsPrivacy