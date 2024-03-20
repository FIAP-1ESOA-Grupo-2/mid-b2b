import { Meeting } from "@/types/Meeting";
import { User } from "@/types/Auth";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineLocalLibrary } from "react-icons/md";

type Props = {
    data: Meeting,
    user: User
}

export const MeetingCard = ({ data, user }: Props) => {
    return (
        <div
            className={`flex flex-col justify-between gap-6 sm:gap-12 p-6 items-center sm:flex-row bg-white rounded-lg border-2 shadow-md border-slate-200`}
        >
            <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-600">Encontro #{data.id}</h2>

                <div className='flex items-center gap-3 flex-wrap'>
                    <div className='flex items-center gap-2 mt-1 mb-0.5 bg-slate-100 border border-slate-300 py-[1px] px-2 rounded-sm text-slate-600'>
                        <MdOutlineDateRange size={15} />
                        <div className='text-[12px] mt-[2px] font-bold flex-1'>A combinar</div>
                    </div>
                    <div className='flex items-center gap-2 mt-1 mb-0.5 bg-slate-100 border border-slate-300 py-[1px] px-2 rounded-sm text-slate-600'>
                        <MdOutlineLocalLibrary size={15} />
                        <div className='text-[12px] mt-[2px] font-bold flex-1'>A combinar</div>
                    </div>
                </div>

                <p className="text-sm text-slate-500 mt-1 flex text-justify" >
                    Encontro baseado em {data.matchups} interesses: {data.interests}
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full sm:w-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        className="bg-mainblue hover:bg-mainbluehover text-white font-bold shadow-md py-2 px-10 rounded-md w-full transition-all order-1 md:order-2"
                    >
                        Ver detalhes
                    </button>
                </div>
            </div>
        </div >
    )
}