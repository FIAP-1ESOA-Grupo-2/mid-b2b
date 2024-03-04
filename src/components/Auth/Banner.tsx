import banner from '@/assets/images/bannerauth.svg'
import mobileBanner from '@/assets/images/Illustrationsignup.svg'
import Image from 'next/image'

export const Banner = () => {
    return <div>
        <div className='lg:hidden'>
            <Image src={mobileBanner} alt='Imagem do banner mobile'/>
        </div>
        <div className='hidden lg:block'>
            <Image src={banner} alt='Imagem do banner'/>
        </div>
    </div>
}