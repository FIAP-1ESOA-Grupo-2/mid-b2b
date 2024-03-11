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
        <div className="flex flex-col h-screen bg-[#F2F3F5]">
            <div className="hidden sm:block">
                <DashboardHeader mode="desktop" />
            </div>

            <div className="flex-1 overflow-auto">
                <div className="flex gap-4 mx-auto max-w-screen-xl w-full px-4 xl:px-0  mt-8">
                    <div className="hidden lg:block fixed max-h-[calc(100vh-110px)] pr-1.5 overflow-y-hidden hover:overflow-y-scroll overflow-x-hidden">
                        <DashboardLeftSide
                            user={user}
                        />
                    </div>

                    <div className="flex-1 mb-4 lg:ml-80">
                        {children}
                    </div>
                </div>
            </div>

            <div className="block sm:hidden">
                <DashboardHeader mode="mobile" />
            </div>
        </div>
    )
}