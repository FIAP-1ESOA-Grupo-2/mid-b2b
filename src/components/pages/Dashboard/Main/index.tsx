"use client"
import Image from "next/image";
import { FindDeals } from "./FindDeals";
import { Greetings } from "./Greetings";
import LogoImg from '@/assets/images/logo.svg'
import { MeetingPlace } from "./MeetingPlace";

export const DashboardMainPage = () => {
    return (
        <section className="flex flex-col gap-5">
            <Image src={LogoImg} alt="logo" priority className="sm:hidden mx-auto" height={30} />
            <Greetings />
            <FindDeals />
            <MeetingPlace />
        </section>
    )
}