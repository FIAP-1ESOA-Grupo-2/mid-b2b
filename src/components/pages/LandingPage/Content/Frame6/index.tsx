import Image from "next/image";
import LP4 from "@/assets/images/landingpage/lpillustrationquatre.svg";
import { ButtonStart } from "../Button";

export const Frame6 = () => {
    return (
        <section className="bg-[#598498]">
            <div className="mx-7 px-7 xl:px-0 py-8 lg:py-28 lg:mx-auto max-w-screen-xl flex flex-col-reverse lg:flex-row gap-8">
                <div className="w-full lg:w-1/2 flex justify-center">
                    <Image src={LP4} alt="Ilustração" className="w-64 h-60 md:w-fit md:h-fit"/>
                </div>
                <div className="w-full lg:w-1/2 mb-7 flex flex-col justify-center">
                    <h3 className="text-xs text-white mb-1 lg:text-xl">Comece hoje</h3>
                    <h1 className="text-white text-2xl font-semibold mb-6 lg:text-[40px]">Faça negócios, parcerias e conexões em apenas um clique!</h1>
                    <p className="text-sm text-white mb-11 lg:text-xl">Está pronto para conhecer milhares de empresários em todo Brasil?</p>
                    <ButtonStart />
                </div>
            </div>
        </section>
    );
};
