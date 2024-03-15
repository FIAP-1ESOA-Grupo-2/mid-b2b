import { DashboardInterestsPage } from "@/components/pages/Dashboard/Interests"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Meus Interesses',
} satisfies Metadata


const DashboardInterests = async () => {
    const user = await isAuthenticated()

    return (
        <main className="bg-white rounded-xl border shadow-sm border-slate-200  pb-5">
            <DashboardInterestsPage
                user={user}
            />
        </main>
    )
}

export default DashboardInterests