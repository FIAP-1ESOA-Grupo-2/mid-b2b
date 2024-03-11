import { DashboardHeader } from "@/components/Dashboard/Header"
import { DashboardLeftSide } from "@/components/Dashboard/LeftSide"
import { DashboardRightSide } from "@/components/Dashboard/RightSide"
import { isAuthenticated } from "@/middlewares/isAuth"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const user = await isAuthenticated()

    return (
        <div className="flex flex-col overflow-hidden h-screen bg-[#F2F3F5]">
            <div className="hidden sm:block">
                <DashboardHeader mode="desktop" />
            </div>

            <div className="flex flex-1 gap-4 mx-auto max-w-[1380px] overflow-auto w-full px-4 xl:px-0 mt-8">
                <div className="hidden sm:block">
                    <DashboardLeftSide
                        user={user}
                    />
                </div>

                <div className="flex-1">
                    {children}
                </div>

                <div className="hidden sm:block">
                    <DashboardRightSide
                        user={user}
                    />
                </div>
            </div>

            <div className="block sm:hidden">
                <DashboardHeader mode="mobile" />
            </div>
        </div>
    )
}