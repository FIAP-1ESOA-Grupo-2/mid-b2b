import Image from "next/image"
import LP1 from "@/assets/images/landingpage/lpillustrationune.svg"
import { ButtonStart } from "../Button"

export const Frame1 = () => {
    return (
        <section id="inicio" className="flex flex-col mx-auto py-12 items-center mt-24 justify-center xl:flex-row max-w-screen-xl px-7 xl:px-0">
            <div className="flex flex-col gap-9 nth">
                <h1 className="text-[32px] xl:text-[55px] text-gray-950">Crie conexões, parcerias e negócios tudo em um só lugar</h1>
                <p className="text-sm xl:text-lg text-gray-500">A melhor plataforma para estimular encontros entre empresários em todo o Brasil</p>
                <ButtonStart />
            </div>
            <Image src={LP1} alt="Ilustração 1" className="w-64 h-60 md:w-fit md:h-fit"/>
        </section>
    )
}