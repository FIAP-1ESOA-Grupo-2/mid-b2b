import Image from 'next/image'
import logoteste from '@/assets/images/logoteste.svg'
import { useState } from "react";
import imageMobile from '@/assets/images/Illustrationsignup.svg'

export const TipoConta = () => {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);
    const handleButtonClick = (opcao: string) => {
        setOpcaoSelecionada(opcao);
    };
    return (
        <section className="sm:flex flex-col mx-auto overflow-y-hidden h-screen justify-center">
            <nav className="ml-10 mt-10 lg:hidden">
                <Image src={logoteste} alt="logo teste"/>
            </nav>
            <section className="flex flex-col items-center justify-center p-4 h-screen ">
            <Image src={imageMobile} alt="Ilustração" className="mx-auto"/>
                <section>
                    <h1 className="text-4xl text-center my-12">Selecione o tipo de conta</h1>
                    <nav className="flex flex-col gap-6">
                        <button
                            onClick={() => handleButtonClick('opcao1')}
                            className={`text-base py-4 px-16 bg-mainblue border-2 border-mainblue rounded-lg text-mainblue text-white hover:bg-mainbluehover hover:border-mainbluehover
                                
                            `} type="button">
                            Comprador
                        </button>
                        <button
                            onClick={() => handleButtonClick('opcao2')}
                            className={`text-base py-4 px-16 bg-transparent border-2 border-mainblue rounded-lg text-mainblue hover:bg-mainbluehover hover:border-mainbluehover hover:text-white
                                ${opcaoSelecionada === 'opcao2' ? 'bg-mainblue text-formbg' : 'bg-transparent'}
                            `} type="button">
                            Vendedor
                        </button>
                    </nav>
                    <p className="text-center my-11">Já tem uma conta? <a className="text-mainblue" href="#">Faça log in</a></p>
                </section>
            </section>
        </section>
    )
}