"use client";

import Icon1 from '@/assets/images/dashboard-leftside-icon-1.svg';
import Icon2 from '@/assets/images/dashboard-leftside-icon-2.svg';
import Image from "next/image";
import Link from 'next/link';

export const FindDeals = () => {
    return (
        <section className='flex gap-5 flex-wrap'>
            <section className="flex flex-col justify-between bg-white py-8 px-10 rounded-xl border shadow-sm border-slate-200 flex-1 gap-5">
                <div>
                    <Image src={Icon1} alt='Imagem Icone' className='mb-3' height={60} />
                    <h1 className='text-3xl font-bold mb-3'>Encontre o melhor negócio</h1>
                    <p className='text-base mb-3'>Faça negócios hoje mesmo</p>
                </div>
                <div>
                    <Link
                        href='/dashboard/meetings/schedule' className='block px-9 py-3 bg-mainblue text-base text-white font-bold rounded-xl w-fit'>Encontrar</Link>
                </div>
            </section>
            <section className="flex flex-col justify-between bg-white py-8 px-10 rounded-xl border shadow-sm border-slate-200 flex-1">
                <div>
                    <Image src={Icon2} alt='Imagem Icone' className='mb-3' height={60} />
                    <h1 className='text-3xl font-bold mb-3'>Veja seus encontros agendados</h1>
                    <p className='text-base mb-3'>Gerencie seus encontros</p>
                </div>
                <div>
                    <Link
                        href='/dashboard/meetings/schedule'
                        className='px-9 py-3 bg-mainblue text-base text-white font-bold rounded-xl block w-fit'>Minha agenda</Link>
                </div>
            </section>
        </section>
    )
}