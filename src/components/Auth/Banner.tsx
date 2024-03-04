import banner from '@/assets/images/bannerauth.svg'
import mobileBanner from '@/assets/images/Illustrationsignup.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const Banner = () => {
    return <div className='container'>
        <div className='md:hidden'>
            <Image src={mobileBanner} alt='Imagem do banner mobile'/>
        </div>
        <div className=''>
            <Image src={banner} alt='Imagem do banner mobile' className='hidden md:block'/>
        </div>
    </div>
}