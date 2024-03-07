import Image from 'next/image'
import imageMobile from '@/assets/images/confirmemail.svg'
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { goToNextStep, setData } from '@/redux/reducers/signUpReducer';
import { HStack, PinInput, PinInputField, useToast } from '@chakra-ui/react'
import { checkEmailVerification, sendEmailVerification } from '@/server/services/authService';

export const EmailConfirm = () => {
    const dispatch = useAppDispatch()
    const signUpData = useAppSelector(state => state.signUp.data)

    const toast = useToast()

    const handleClick = () => {
        toast.promise(sendEmailVerification(signUpData.email), {
            success: { title: 'Email enviado com sucesso!ﾠﾠﾠﾠ', description: 'Insira o código de verificação...', position: 'top-right' },
            error: { title: 'Estamos em manutenção', description: 'Por favor tente mais tarde' },
            loading: { title: 'Enviando o email de verificação!', description: 'Por favor aguarde...', position: 'top-right' },
        })
    }

    const handleInputChange = (value: string) => {
        if (value.length < 5) return;

        const promise = new Promise(async (resolve, reject) => {
            if (await checkEmailVerification(signUpData.email, value)) {
                resolve(true)
                dispatch(setData({ ...signUpData, emailVerified: true }))
                dispatch(goToNextStep())
            } else {
                reject('Código inválido')
            }
        })

        toast.promise(promise, {
            success: { title: 'Email verificado com sucesso!', description: 'Redirecionando para o último passo...', position: 'top-right' },
            error: { title: 'O código inserido é inválido', description: 'Por favor tente novamente' },
            loading: { title: 'Validando o código de verificação', description: 'Por favor aguarde...', position: 'top-right' },
        })
    }

    return (
        <section className="sm:flex flex-col mx-auto  mt-12 justify-center">
            <section className="flex flex-col items-center justify-center p-4  ">
                <Image src={imageMobile} alt="Ilustração" className="mx-auto" height={250} />

                {signUpData.emailVerified ?
                    <section className='mt-6'>
                        <h1 className="text-3xl font-bold text-center">Email verificado com <span className='text-mainblue'>sucesso</span></h1>
                        <p className=' mb-12 max-w-md text-center text-slate-700 text-sm'>
                            Seu email foi verificado com sucesso. O status da sua conta é <span className='text-green-600 font-semibold'>ativo</span>. <br /> Seja Bem-vindo(a)
                        </p>
                    </section>
                    :
                    <section className='mt-6'>
                        <h1 className="text-3xl font-bold text-center">Verifique seu email</h1>
                        <p className=' mb-12 max-w-md text-center text-slate-700 text-sm'>
                            Nós enviamos um email para confirmar o seu cadastro. <br /> Insira o código de verificação que enviamos para o seu email.
                        </p>

                        <div className='flex gap-5 justify-center'>
                            <PinInput size='lg' onChange={handleInputChange}>
                                <PinInputField autoFocus />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </div>

                        <p className="text-center mt-16">
                            Não recebeu o email?
                            <button
                                onClick={handleClick}
                                className="text-mainblue hover:text-mainbluehover hover:underline font-semibold"
                            >ﾠClique aqui para reenviar</button>
                        </p>
                    </section>
                }
            </section>
        </section >
    )
}