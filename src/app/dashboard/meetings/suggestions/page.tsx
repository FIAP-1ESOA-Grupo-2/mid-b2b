import { DashboardMeetingsSuggestionsPage } from "@/components/pages/Dashboard/Meetings/Suggestions"
import { isAuthenticated } from "@/middlewares/isAuth"
import { Metadata } from "next"

export const metadata = {
    title: 'Dashboard > Sugestões de encontros',
} satisfies Metadata

const DashboardMeetingsSuggestions = async () => {
    const user = await isAuthenticated()

    return (
        <main>
            <DashboardMeetingsSuggestionsPage
                user={user}
            />
        </main>
    )
}

export default DashboardMeetingsSuggestions