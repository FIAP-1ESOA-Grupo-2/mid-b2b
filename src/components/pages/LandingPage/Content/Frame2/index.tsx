import LP2 from "@/assets/images/landingpage/lpillustrationdeux.svg"
import NetIcon from "@/assets/images/landingpage/lpnetworking.svg"
import NetNeg from "@/assets/images/landingpage/lpnegocios.svg"
import NetPar from "@/assets/images/landingpage/lpparcerias.svg"
import Image from "next/image"
import { TypeList } from "./TypeList"

export const Frame2 = () => {
    return (
        <section id="porqueusar" className="mx-7 px-7 xl:px-0 py-2 max-w-screen-xl lg:mx-auto flex flex-col items-center justify-center">
            <section className="flex flex-col mb-12 gap-2 md:text-center">
                <h2 className="text-mainblue text-xs font-semibold md:text-xl">Por que usar Align Meet</h2>
                <h1 className="text-gray-950 text-2xl md:text-4xl md:mb-6">Economiza seu tempo e abre oportunidades</h1>
                <p className="text-gray-500 text-sm md:text-xl">Nossa plataforma agiliza sua busca por conexões comerciais significativas, economizando o seu tempo em potenciais parcerias, inovações e negócios.</p>
            </section>
            <section className="flex flex-col-reverse justify-center items-center lg:flex-row lg:gap-40 mb-24">
                <Image src={LP2} alt="Ilustração" className="w-64 h-60 md:w-fit md:h-fit" />
                <ul className="flex flex-col gap-8">
                    <TypeList
                        icon={NetIcon}
                        alt="Icone"
                        title="Networking"
                        paragraph="Conecte-se com líderes do seu setor por meio de encontros selecionados, promovendo relacionamentos e aumentando seu conhecimento." /
                    >
                    <TypeList
                        icon={NetNeg}
                        alt="Icone"
                        title="Negócios"
                        paragraph="Nossa plataforma combina perfeitamente você com potenciais colaboradores, abrindo portas para novos empreendimentos e inovações." /
                    >
                    <TypeList
                        icon={NetPar}
                        alt="Icone"
                        title="Parcerias"
                        paragraph="Criação de parcerias estratégicas, conectando você com os executivos ideais para impulsionar o sucesso mútuo e a inovação. Descubra o potencial em cada conexão." /
                    >
                </ul>
            </section>
        </section>
    )
}