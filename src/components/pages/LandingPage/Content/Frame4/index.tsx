import Image from "next/image"
import { ListConfirm } from "./ListConfirm"
import LP3 from "@/assets/images/landingpage/lpillustrationtrois.svg"

export const Frame4 = () => {
    return (
        <section className="mx-7 px-7 xl:px-0 py-8 lg:py-28 lg:mx-auto max-w-screen-xl flex flex-col items-center lg:flex-row gap-8">
            <section className="mb-8">
                <h3 className="text-xs text-mainblue mb-3 lg:text-xl">Não perca tempo</h3>
                <h1 className="font-bold text-gray-900 mb-8 text-xl lg:text-start text-[40px] leading-10 lg:mb-14">Nossa missão  é conectar você com quem mais  te interessa</h1>
                <section className="flex flex-col gap-8">
                    <h2 className="text-gray-900 text-base text-center font-semibold lg:text-start lg:text-2xl">Construção de relacionamento sem esforço</h2>
                    <ul className="flex flex-col gap-8 max-w-lg">
                        <ListConfirm paragraph="Encontros selecionadas com base em seu setor e experiência para conexões significativas."/>
                        <ListConfirm paragraph="Conheça executivos em ambientes descontraídos, promovendo interações e amizades duradouras."/>
                        <ListConfirm paragraph="Conecte-se com executivos de setores complementares para potenciais colaborações e crescimento."/>
                    </ul>
                </section>
            </section>
            <Image src={LP3} alt="Ilustração" className="w-64 h-60 md:w-fit md:h-fit"/>
        </section>
    )
}