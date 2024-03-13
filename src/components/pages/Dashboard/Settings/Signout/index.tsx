import { useToast } from "@chakra-ui/react"
import { signOut } from "next-auth/react";
import { FaAngleRight } from "react-icons/fa6";

export const SignOut = () => {
    const toast = useToast()

    const handleSignOut = () => {
        toast({
            title: 'Saindo...',
            description: 'Por favor aguarde',
            status: 'loading',
            duration: 10 * 1000,
            position: 'top-right'
        })

        signOut()
    }
    return (
        <button
            onClick={handleSignOut}
            className="w-full flex justify-between items-center cursor-pointer py-3 hover:text-mainbluehover text-zinc-500 outline-none"
        >
            <span className="">Sair</span>
            <FaAngleRight size={20}/>
        </button>
    )
}