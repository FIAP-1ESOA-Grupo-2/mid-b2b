import { AcceptReject } from "./AcceptReject"
import { ItemList } from "./ItemList"

export const FindBusiness = () => {
    return (
        <section className="flex flex-col justify-between gap-2 p-4 items-center sm:flex-row bg-white rounded-xl border shadow-sm border-slate-200">
            <section className="flex flex-col justify-around gap-2">
                <p className="text-gray-400 text-sm">Hoje as 9:42 AM</p>
                <h1 className="text-gray-900 text-2xl font-bold">Você tem um novo encontro marcado!</h1>
                <h3 className="text-base text-gray-500">Vocês possuem 4 interesses em comum.</h3>
                <ItemList/>
            </section>
            <AcceptReject />
        </section>  
    )
}