import { FaAngleRight } from "react-icons/fa6";

export const TermsAndConditions = () => {
    return (
        <button
            className="w-full flex justify-between items-center cursor-pointer py-3 hover:text-mainbluehover text-zinc-500 outline-none border-b-[1px]"
        >
            <span className="">Termos e condições</span>
            <FaAngleRight size={20}/>
        </button>
    )
}