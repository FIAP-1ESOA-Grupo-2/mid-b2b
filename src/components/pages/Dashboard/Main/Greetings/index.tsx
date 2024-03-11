import { useSession } from "next-auth/react"
import { Avatar, SkeletonCircle } from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";

export const Greetings = () => {
    const auth = useSession()
    return (
        <section className="bg-white py-8 px-10 rounded-xl border shadow-sm border-slate-200">
            <section className="w-full flex items-center justify-between gap-3">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-bold text-xl mb-2">Oi {auth.data?.user.name}!</h1>
                            <p className="text-base mb-2">Pronto para fazer negócios?</p>
                        </div>
                        <div className="sm:hidden">
                            <SkeletonCircle isLoaded={auth.status == 'authenticated'} width={10} height={10}>
                                <Avatar name={auth.data?.user.name} width={10} height={10} />
                            </SkeletonCircle>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center p-3 border-[1px] rounded-xl w-full mr-2">
                            <MdOutlineSearch size={24} color="#71717A"/>
                            <input placeholder="O que está procurando?" type="text" className="w-full outline-none bg-transparent"/>
                        </div>
                        <div className="sm:hidden">
                            <IoFilterOutline color="#007AB5" size={24}/>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}