import { DashboardMeetingsSchendulePage } from "@/components/pages/Dashboard/Meetings/Schedule"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Minha agenda',
} satisfies Metadata

const DashboardMeetingsSchendule = async () => {
    const user = await isAuthenticated()

    return (
        <main>
            <DashboardMeetingsSchendulePage
                user={user}
            />
        </main>
    )
}

export default DashboardMeetingsSchendule