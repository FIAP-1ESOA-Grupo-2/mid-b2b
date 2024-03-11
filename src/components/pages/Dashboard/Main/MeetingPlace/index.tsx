import Icon3 from '@/assets/images/dashboard-leftside-icon-3.svg';
import Icon4 from '@/assets/images/dashboard-leftside-icon-4.svg';
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";

export const MeetingPlace = () => {
    return (
        <section className='flex gap-5 flex-wrap'>
            <section
                style={{ backgroundImage: `url("/imgs/promotion-card-background.svg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", flex: 1.2 }}
                className="flex  flex-col bg-mainblue text-white py-8 sm:py-0 px-10 rounded-xl border shadow-sm border-slate-200 gap-5 items-start justify-center"
            >
                <h1 className='text-3xl font-bold mb-3'>Dicas para a sua segurança</h1>
                <div className='flex items-center'>
                    <p className='text-base'>Saiba agora mesmo</p>
                    <IoIosArrowRoundForward size={30} />
                </div>
            </section>
            <section className="bg-white py-4 px-5 xl:px-10 rounded-xl border shadow-sm border-slate-200 flex-1 gap-5">
                <Image src={Icon3} alt='Imagem Icone' className='mb-3' height={60} />
                <h1 className='text-3xl font-bold mb-3'>Encontros recentes</h1>
                <p className='text-base mb-3'>Encontre novamente quem mais te agradou</p>
            </section>
            <section className="bg-white py-4  px-5  xl:px-10 rounded-xl border shadow-sm border-slate-200 flex-1">
                <Image src={Icon4} alt='Imagem Icone' className='mb-3' height={60} />
                <h1 className='text-3xl font-bold mb-3'>Descubra novos lugares</h1>
                <p className='text-base mb-3'>Novos locais para se fazer negócios</p>
            </section>
        </section>
    )
}