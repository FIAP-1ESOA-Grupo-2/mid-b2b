import { DashboardHeader } from "@/components/Dashboard/Header";
import { DashboardLeftSide } from "@/components/Dashboard/LeftSide";
import { Metadata } from "next";

export const metadata = {
    title: 'Dashboard',
} satisfies Metadata

const DashboardPage = () => {
    return (
        <main className="flex flex-col overflow-hidden h-screen bg-[#F2F3F5]">
            <div className="hidden sm:block">
                <DashboardHeader mode="desktop" />
            </div>

            <div className="flex-1 mx-auto max-w-screen-xl overflow-auto w-full px-4 xl:px-0">
                <div className="hidden sm:block">
                    <DashboardLeftSide />
                </div>
            </div>

            <div className="block sm:hidden">
                <DashboardHeader mode="mobile" />
            </div>
        </main>

    )
}

export default DashboardPage