import { DashboardInterestsPage } from "@/components/pages/Dashboard/Interests"
import { isAuthenticated } from "@/middlewares/isAuth"
import { getInterests, getUserInterests } from "@/server/services/interestService"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Meus Interesses',
} satisfies Metadata


const DashboardInterests = async () => {
    const [user, interests] = await Promise.all([isAuthenticated(), getInterests()])
    const userInterests = await getUserInterests(user.id)

    return (
        <main className="bg-white rounded-xl border shadow-sm border-slate-200  pb-5">
            <DashboardInterestsPage
                user={user}
                interests={interests}
                userInterests={userInterests}
            />
        </main>
    )
}

export default DashboardInterests