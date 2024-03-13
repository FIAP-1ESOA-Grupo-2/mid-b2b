import { DashboardLayout } from "@/components/layouts/Dashboard"
import { isAuthenticated } from "@/middlewares/isAuth"

export default async function Dashboard({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await isAuthenticated()

    return (
        <DashboardLayout user={user}>
            {children}
        </DashboardLayout>
    )
}