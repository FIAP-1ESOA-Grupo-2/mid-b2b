import banner from '@/assets/images/bannerauth.svg'
import Image from 'next/image'

export const Banner = () => {
    return <Image src={banner} alt='Imagem do banner' className="hidden lg:block"/>
}