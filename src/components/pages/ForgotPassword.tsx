'use client';

import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from "@/lib/validators/userValidator";
import { PinInput, PinInputField, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from 'next13-progressbar';
import { SubmitHandler, useForm } from "react-hook-form";
import { checkPasswordReset, sendEmailForgotPassword, updatePassword } from "@/server/services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
    const [step, setStep] = useState<'send-email' | 'verify-code' | 'new-password'>('send-email')
    const [email, setEmail] = useState('')
    const [valuePassword, setValuePassword] = useState<string>('');
    const [valuePasswordConfirm, setValuePasswordConfirm] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

    type Inputs = z.infer<typeof forgotPasswordSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(forgotPasswordSchema)
    })

    const toast = useToast()
    const router = useRouter()

    const onSubmitSendEmail: SubmitHandler<Inputs> = async ({ email_or_cpf }) => {
        toast({
            title: 'Enviando e-mail...',
            description: 'Por favor aguarde',
            status: 'loading',
            position: 'top-right',
            id: 'forgot-password-loading'
        })

        const user = await sendEmailForgotPassword(email_or_cpf)
        if (user?.data) setEmail(user.data.email)

        toast.close('forgot-password-loading')
        toast({
            title: 'E-mail enviado com sucesso!',
            description: 'Insira o código de verificação para continuar',
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
        })

        setStep('verify-code')
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleTogglePasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleChangeCode = async (value: string) => {
        if (value.length < 5) return;

        if (email) {
            const passwordReset = await checkPasswordReset(email, value)

            if (passwordReset) {
                setStep('new-password')
                toast({
                    title: 'Código verificado com sucesso!',
                    description: 'Defina sua nova senha',
                    status: 'success',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Código inválido!',
                    description: 'Por favor tente novamente',
                    status: 'error',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: 'Código inválido!',
                description: 'Por favor tente novamente',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdatePassword = async () => {
        if (valuePassword !== valuePasswordConfirm) {
            toast({
                title: 'As senhas não conferem!',
                description: 'As senhas devem ser iguais',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        toast({
            title: 'Alterando senha e autenticando...',
            description: 'Por favor aguarde',
            status: 'loading',
            position: 'top-right',
            id: 'update-password-loading'
        })

        const { data } = await updatePassword(email, valuePassword)
        await signIn('credentials', { user: JSON.stringify(data), redirect: false })

        toast.close('update-password-loading')
        toast({
            title: 'Autenticado com sucesso!',
            description: "Seja bem-vindo(a)",
            status: 'success',
            position: 'top-right',
            duration: 3000,
            isClosable: true
        })

        router.push('/dashboard')
    }

    return (
        <div className='max-w-screen-md mx-auto h-screen -mb-1'>
            <div className="flex flex-col items-center justify-center h-full mx-8">
                <h1 className="text-3xl font-bold">Esqueci minha senha</h1>
                <p className='mt-1 mb-6 max-w-lg text-center text-slate-700 text-sm'>
                    {step == 'send-email' ?
                        'Insira seu e-mail ou CPF e enviaremos um e-mail para redefinir sua senha.' :
                        step == 'verify-code' ?
                            'Insira o código de verificação enviado para seu e-mail ou CPF e defina sua nova senha.'
                            : 'Defina sua nova senha para sua conta.'
                    }
                </p>

                {step == 'send-email' &&
                    <form className="w-full" onSubmit={handleSubmit(onSubmitSendEmail)}>
                        <div className="mb-6">
                            <input
                                {...register("email_or_cpf")}
                                id="email"
                                placeholder="E-mail ou CPF"
                                className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.email_or_cpf ? "border-red-500" : "border-slate-100 focus:border-mainblue"}  transition-all`}
                            />
                            <small className="ml-2 text-red-600 font-semibold">{errors.email_or_cpf?.message}</small>
                        </div>

                        <button type="submit" className="bg-mainblue text-formbg py-3 text-base rounded-lg shadow-xl hover:bg-mainbluehover duration-100 ease-in-out w-full">
                            Enviar e-mail
                        </button>
                    </form>
                }

                {step == 'verify-code' &&
                    <div className='mt-8 flex gap-5 justify-center'>
                        <PinInput size='lg' onChange={handleChangeCode}>
                            <PinInputField autoFocus />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </div>
                }

                {step == 'new-password' &&
                    <div className="w-full">
                        <div className="mb-6">
                            <div className="flex bg-formbg rounded-lg">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nova senha *"
                                    value={valuePassword}
                                    onChange={(e) => setValuePassword(e.target.value)}
                                    className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 border-slate-100 focus:border-mainblue`}
                                />
                                <button
                                    type="button"
                                    className="mx-6"
                                    onClick={handleTogglePassword}>
                                    {showPassword ? <FaEye size={18} className="text-mainblue" /> : <FaEyeSlash size={18} className="text-mainblue" />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex bg-formbg rounded-lg">
                                <input
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    placeholder="Confirme sua nova senha *"
                                    value={valuePasswordConfirm}
                                    onChange={(e) => setValuePasswordConfirm(e.target.value)}
                                    className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 border-slate-100 focus:border-mainblue`}
                                />
                                <button
                                    type="button"
                                    className="mx-6"
                                    onClick={handleTogglePasswordConfirm}>
                                    {showPasswordConfirm ? <FaEye size={18} className="text-mainblue" /> : <FaEyeSlash size={18} className="text-mainblue" />}
                                </button>
                            </div>
                        </div>

                        <button onClick={handleUpdatePassword} className="bg-mainblue text-formbg py-3 text-base rounded-lg shadow-xl hover:bg-mainbluehover duration-100 ease-in-out w-full">
                            Definir nova senha
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ForgotPassword