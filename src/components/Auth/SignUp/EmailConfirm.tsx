import Image from 'next/image'
import imageMobile from '@/assets/images/confirmemail.svg'
import Link from 'next/link';
import { UserAccountType } from '@/types/Auth';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { goToNextStep, setData } from '@/redux/reducers/signUpReducer';
import { HStack, PinInput, PinInputField } from '@chakra-ui/react'

export const EmailConfirm = () => {
    const dispatch = useAppDispatch()
    const signUpData = useAppSelector(state => state.signUp.data)



    return (
        <section className="sm:flex flex-col mx-auto  mt-12 justify-center">
            {/*#TODO Alterar imagem dos logos*/}

            <section className="flex flex-col items-center justify-center p-4  ">
                <Image src={imageMobile} alt="Ilustração" className="mx-auto" height={250} />

                <section className='mt-6'>
                    <h1 className="text-3xl font-bold text-center">Verifique seu email</h1>
                    <p className=' mb-12 max-w-md text-center text-slate-700 text-sm'>
                        Nós enviamos um email para confirmar o seu cadastro. <br /> Insira o código de verificação que enviamos para o seu email.
                    </p>

                    <div className='flex gap-5 justify-center'>
                        <PinInput size='lg'  >
                            <PinInputField autoFocus />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </div>

                    <p className="text-center mt-16">
                        Não recebeu o email?
                        <Link className="text-mainblue hover:text-mainbluehover hover:underline font-semibold" href="/auth/signin"> Clique aqui para reenviar</Link>
                    </p>
                </section>
            </section>
        </section>
    )
}