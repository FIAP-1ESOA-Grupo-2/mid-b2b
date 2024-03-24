import Image from "next/image"
import P1 from "@/assets/images/landingpage/lphiw1.svg"
import P2 from "@/assets/images/landingpage/lphiw2.svg"
import P3 from "@/assets/images/landingpage/lphiw3.svg"
import { ListSteps } from "./ListType"
import { ButtonStart } from "../Button"

export const Frame3 = () => {
    return (
        <section id="comofunciona" className="bg-[#598498] lg:py-[120px] py-16 flex flex-col items-center justify-center">
            <div className="mx-7 px-7 xl:px-0 py-2 lg:mx-auto max-w-screen-xl text-center">
                <div>
                    <h3 className="text-white text-sm mb-2 lg:text-xl">Como funciona</h3>
                    <h1 className="text-white text-2xl font-semibold mb-3 lg:text-[40px]">Apenas alguns passos e pronto</h1>
                    <p className="text-white text-sm lg:text-xl">Em poucos passos você estará pronto para se conectar com empresários em todo o Brasil</p>
                </div>
                <ul className="flex items-center justify-center flex-col lg:flex-row lg:gap-[135px] mb-16">
                        <ListSteps src={P1} alt="Passos"/>
                        <ListSteps src={P2} alt="Passos"/>
                        <ListSteps src={P3} alt="Passos"/>
                </ul>
                <ButtonStart /> 
            </div>
        </section>
    )
}