import banner from '@/assets/images/bannerauth.svg'
import mobileBanner from '@/assets/images/Illustrationsignup.svg'
import Image from 'next/image'

export const Banner = () => {
    return <div>
        <div className='md:hidden sm:hidden'>
            <Image src={mobileBanner} alt='Imagem do banner mobile'/>
        </div>
        <div className='hidden sm:block'>
            <Image src={banner} alt='Imagem do banner mobile'/>
        </div>
    </div>
}