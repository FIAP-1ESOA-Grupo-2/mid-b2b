import Link from "next/link"

export const ButtonStart = () => {
    return <Link href='/auth/signup' className="bg-mainblue text-white text-nowrap w-full py-[14px] px-[50px] rounded-full xl:w-max text-center text-base hover:bg-mainbluehover duration-100 ease-in-out">Comece hoje</Link>
}