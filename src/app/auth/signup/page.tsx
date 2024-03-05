'use client'
import { Banner } from "@/components/Auth/Banner"
import { StepperSign } from "@/components/StepperSign/StepperSign"
import Image from "next/image"
import chat from '@/assets/images/chat.svg'
import logoteste from '@/assets/images/logoteste.svg'

export default () => {
    return (
        <div className="sm: h-screen flex justify-center flex-col">
            <div className="hidden lg:block">
                <StepperSign/>
            </div>
            <Image src={logoteste} alt="logo" className="ml-10 mb-10"/>
            <div className="flex justify-center items-center flex-col px-20">
                <Banner />
                <h1>Selecione o tipo de conta</h1>
                <button 
                    type="button"
                    className="bg-mainblue py-5 px-16 rounded-lg text-white hover:bg-mainbluehover ease-in-out duration-50 text-base mb-7"
                >
                    Comprador
                </button>
                <button 
                    type="button"
                    className="bg-white py-5 px-16 rounded-lg border-solid border-2 border-mainblue text-mainblue mb-12 hover:bg-gray-200 ease-in-out duration-50 text-base"
                >
                    Vendedor
                </button>
                <p 
                    className=""
                >
                    Já tem uma conta? 
                    <a 
                        href="#"
                        className="mx-2 text-mainblue hover:border-b-2 text-base border-mainbluehover text-mainbluehover ease-in-out duration-100"
                    >Faça log in
                    </a>
                </p>
            </div>
            <div className="fixed bottom-3 right-3">
                <Image src={chat} alt="Chat Supporte"/>
            </div>
        </div>
    )   
}