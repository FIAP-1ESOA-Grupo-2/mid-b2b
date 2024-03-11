import { DashboardMainPage } from "@/components/pages/Dashboard/Main";
import { Metadata } from "next";

export const metadata = {
    title: 'Dashboard',
} satisfies Metadata

const DashboarMain = () => {
    return (
        <main>
            <DashboardMainPage />
        </main>
    )
}

export default DashboarMain