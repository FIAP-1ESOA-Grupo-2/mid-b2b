"use client";

import { User } from "@/types/Auth";
import { MdAdd } from "react-icons/md";

type Props = {
    user: User
}

export const DashboardRightSide = ({ user }: Props) => {
    return (
        <div className="flex flex-col gap-4 mb-14 w-72">
            <div className="flex flex-col gap-3 pl-4 pr-2 py-4 bg-white rounded-xl border shadow-sm border-slate-200">
                <span className="font-bold text-slate-700">Adicione novos interesses</span>

                <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto" >
                    <div className="flex gap-1 items-center bg-[#e5eefd] px-2.5 py-1 rounded-full cursor-pointer duration-200 hover:bg-[#d5e4ff]">
                        <MdAdd />

                        <span className="text-sm font-semibold">React</span>
                    </div>
                </div>
            </div>
        </div>
    )
}