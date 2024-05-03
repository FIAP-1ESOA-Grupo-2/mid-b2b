import Image from "next/image"
import Logo from "@/assets/images/logo.svg"
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

export const FooterLP = () => {
    return (
        <section className="flex flex-col justify-center items-center mx-auto my-12">
            <Image src={Logo} alt="Logo" height={30} width={98} />
            <ul className="flex flex-col lg:flex-row text-center gap-10 text-gray-900 text-lg my-10">
                <li><a href="#inicio">Início</a></li>
                <li><a href="#porqueusar">Por que nos escolher</a></li>
                <li><a href="#comofunciona">Como funciona</a></li>
                <li><a href="#depoimentos">Depoimentos</a></li>
            </ul>
            <ul className="flex gap-10 text-gray-900 text-lg mb-7">
                <li><FaFacebookF /></li>
                <li><FaTwitter /></li>
                <li><TfiYoutube /></li>
            </ul>
            <p className="text-gray-500 text-xs mb-4">&copy; Copyright 2024 - Align Meet</p>
        </section>
    )
}