import { DashboardMeetingsClosedPage } from "@/components/pages/Dashboard/Meetings/Closed"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Encontros encerrados',
} satisfies Metadata

const DashboardMeetingsClosed = async () => {
    const user = await isAuthenticated()

    return (
        <main>
            <DashboardMeetingsClosedPage
                user={user}
            />
        </main>
    )
}

export default DashboardMeetingsClosed