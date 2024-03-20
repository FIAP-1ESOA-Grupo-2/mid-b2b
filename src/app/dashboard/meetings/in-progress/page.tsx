import { DashboardMeetingsInProgressPage } from "@/components/pages/Dashboard/Meetings/InProgress"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Encontros em andamento',
} satisfies Metadata

const DashboardMeetingsInProgress = async () => {
    const user = await isAuthenticated()

    return (
        <main>
            <DashboardMeetingsInProgressPage
                user={user}
            />
        </main>
    )
}

export default DashboardMeetingsInProgress