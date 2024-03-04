import banner from '@/assets/images/bannerauth.svg'
import mobileBanner from '@/assets/images/Illustrationsignup.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const Banner = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isLargerScreen = windowWidth > 640

    return <Image 
        src={isLargerScreen ? banner : mobileBanner} 
        alt='Alt' 
        priority
        className=" h-auto"
    />
}