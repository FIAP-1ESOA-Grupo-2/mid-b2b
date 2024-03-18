"use client";

import { Avatar } from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { User } from "@/types/Auth";
import { useChannel } from "ably/react";

type Props = {
    user: User
}

export const Greetings = ({ user }: Props) => {
    const { channel, ably } = useChannel("get-started");

    return (
        <section className="bg-white py-8 px-10 rounded-xl border shadow-sm border-slate-200">
            <button onClick={() => channel.publish("message-1", { data: "Hello!" })}>
                Enviar
            </button>

            <section className="w-full flex items-center justify-between gap-3">
                <div className="w-full">
                    <div className="flex items-center justify-between ">
                        <div>
                            <h1 className="font-bold text-xl mb-2 text-slate-700">Olá, {user.name}!</h1>
                            <p className="text-base mb-2">Pronto para fazer negócios?</p>
                        </div>
                        <div className="sm:hidden mr-1.5">
                            <Avatar name={user.name} width={10} height={10} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center p-3 border-[1px] rounded-xl w-full mr-2">
                            <MdOutlineSearch size={24} color="#71717A" />
                            <input placeholder="O que está procurando?" type="text" className="w-full outline-none bg-transparent" />
                        </div>
                        <div className="sm:hidden border-[1px] p-2.5 rounded-lg bg-[#F4F5FF]">
                            <IoFilterOutline color="#007AB5" size={26} />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}