import Image from "next/image";
import { FindDeals } from "./FindDeals";
import { Greetings } from "./Greetings";
import LogoImg from '@/assets/images/logo.svg'
import { MeetingPlace } from "./MeetingPlace";
import { isAuthenticated } from "@/middlewares/isAuth";

export const DashboardMainPage = async () => {
    const user = await isAuthenticated()

    return (
        <section className="flex flex-col gap-5">
            <Image src={LogoImg} alt="logo" priority className="sm:hidden mx-auto" height={30} />

            <Greetings
                user={user}
            />

            <FindDeals />
            
            <MeetingPlace />
        </section>
    )
}