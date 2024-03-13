import { FindDeals } from "./FindDeals";
import { Greetings } from "./Greetings";
import { MeetingPlace } from "./MeetingPlace";
import { isAuthenticated } from "@/middlewares/isAuth";

export const DashboardMainPage = async () => {
    const user = await isAuthenticated()

    return (
        <section className="flex flex-col gap-5">
            <Greetings
                user={user}
            />

            <FindDeals />
            <MeetingPlace />
        </section>
    )
}