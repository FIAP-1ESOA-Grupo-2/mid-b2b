import { DashboardSettingsTermsPage } from "@/components/pages/Dashboard/Settings/Terms"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Termos e Condições',
} satisfies Metadata

const DashboardSettingsTerms = async () => {
    await isAuthenticated()

    return (
        <main>
            <DashboardSettingsTermsPage />
        </main>
    )
}

export default DashboardSettingsTerms