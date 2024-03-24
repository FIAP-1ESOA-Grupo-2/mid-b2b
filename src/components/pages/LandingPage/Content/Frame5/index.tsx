import Image from "next/image"
import statement1 from "@/assets/images/landingpage/statements1.svg"
import statement2 from "@/assets/images/landingpage/statements2.svg"
import statement3 from "@/assets/images/landingpage/statements3.svg"

export const Frame5 = () => {
    return (
        <section id="depoimentos" className="px-7 xl:px-0 py-8 lg:py-28 lg:mx-auto max-w-screen-xl gap-8 text-center">
            <section className="flex flex-col gap-4">
                <h3 className="text-mainblue text-sm font-semibold lg:text-xl">Depoimentos</h3>
                <h1 className="text-gray-950 text-2xl font-bold lg:text-[40px]">O que estão falando sobre nós</h1>
                <p className="text-gray-500 text-sm mb-8 lg:mb-[75px] lg:text-xl">Aqui estão alguns depoimentos que mostram o quanto nossa plataforma é útil.</p>
            </section>
            <section className="flex flex-wrap justify-center lg:flex-row gap-8">
                <Image src={statement1} alt="Depoimentos"/>
                <Image src={statement2} alt="Depoimentos"/>
                <Image src={statement3} alt="Depoimentos"/>
            </section>
        </section>
    )
}