"use client"

import { FindBusiness } from "@/components/pages/Dashboard/FindBusiness"

const Appointments = () => {
    return (
        <section className="flex flex-col gap-5">
            <section className="flex flex-col bg-white rounded-xl border shadow-sm border-slate-200 p-4 gap-3">
                <h1 className="text-2xl text-gray-900 font-semibold">Encontros sugeridos</h1>
                <p className="text-sm text-gray-500">Nós selecionamos os encontros baseados nos seus interesses</p>
            </section>
            <FindBusiness />
        </section>
    )
}

export default Appointments