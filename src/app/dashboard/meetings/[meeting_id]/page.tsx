import { DashboardMeetingPage } from "@/components/pages/Dashboard/Meetings/Meeting"
import { isAuthenticated } from "@/middlewares/isAuth"
import { getMeeting } from "@/server/meetingService"
import { Button, Result } from "antd"
import Link from "next/link"

const DashboardMeeting = async ({ params }: { params: { meeting_id: string } }) => {
    const user = await isAuthenticated()
    const meeting = await getMeeting(params.meeting_id, user.id)

    if (meeting.error || !meeting.data) {
        return (
            <main className="bg-white rounded-xl border shadow-sm border-slate-200  py-6">
                <Result
                    status="404"
                    title="404"
                    subTitle="Encontro não encontrado, ou não pode ser acessado..."
                    extra={<Link href='/dashboard/meetings/in-progress'><Button type="primary">Ver meus encontros</Button></Link>}
                />
            </main>
        )
    }

    return (
        <main>
            <DashboardMeetingPage
                user={user}
                meeting={meeting.data}
            />
        </main>
    )
}

export default DashboardMeeting
