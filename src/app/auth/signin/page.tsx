'use client'
import banner from '@/assets/images/bannerauth.png'
import Image from 'next/image'

export default () => {
    return (
        <div className='max-w-full max-h-full'>
            <Image src={banner} alt='Alt' priority/>
        </div>
    )
}