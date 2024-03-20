'use client';

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from "@/lib/validators/userValidator";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from 'next13-progressbar';
import Link from "next/link";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ProfileGoogle } from "@/types/Auth";
import { hasAccountProvider } from "@/server/authProvidersService";
import { SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    type Inputs = z.infer<typeof signInSchema>

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(signInSchema)
    })
    const watchEmailOrCpf = watch('email_or_cpf')

    const toast = useToast()
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = async ({ email_or_cpf, password }) => {
        const signInPromise = new Promise(async (resolve, reject) => {
            const request = await signIn("credentials", { email_or_cpf, password, redirect: false })
            if (request?.error) {
                reject(request?.error)
            } else {
                resolve(request)
                router.push('/dashboard')
            }
        })

        toast.promise(signInPromise, {
            success: { title: 'Autenticado com sucesso!', description: 'Seja bem-vindo(a)', position: 'top-right' },
            error: { title: 'Erro ao tentar autenticar', description: 'Email e/ou senha inválido(s)', position: 'top-right' },
            loading: { title: 'Autenticando...', description: 'Por favor aguarde!', position: 'top-right' },
        })
    }

    const handleGoogleLoginSuccess = async (credential: CredentialResponse) => {
        if (!credential.credential) return;

        const profile: ProfileGoogle = jwtDecode(credential.credential)

        toast({
            title: 'Autenticando...!',
            description: "Por favor aguarde!",
            status: 'loading',
            id: 'google-signin-loading',
            position: 'top-right',
            duration: 3000,
            isClosable: true
        })

        const { data, errorCode } = await hasAccountProvider({ provider_id: profile.sub, provider: 'google' })

        if (errorCode == 'ACCOUNT_NOT_FOUND') {
            toast({
                title: 'E-mail ainda não vinculado!',
                description: "Faça login e depois associe sua conta com o Google",
                status: 'info',
                position: 'top-right',
                duration: 4000,
                isClosable: true
            })
        }

        if (data) {
            await signIn('credentials', { user: JSON.stringify(data), redirect: false })

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

        toast.close('google-signin-loading')
    }

    const handleGoogleLoginError = () => {
        toast({
            title: 'Erro ao conectar com o Google',
            description: "Por favor tente novamente mais tarde",
            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true,
        })
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if (!watchEmailOrCpf) return;

        if (/^[0-9]*$/.test(watchEmailOrCpf)) {
            setValue('email_or_cpf', watchEmailOrCpf.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"))
        }
    }, [watchEmailOrCpf])

    useEffect(() => {
        if (errors.email_or_cpf || errors.password) {
            toast({
                title: 'Erro ao autenticar',
                description: "Preencha todos os campos corretamente",
                status: 'error',
                position: 'top-right',
                duration: 2000,
                isClosable: true,
            })
        }
    }, [errors])

    return (
        <div className='max-w-screen-md mx-auto h-screen -mb-1'>
            <div className="flex flex-col items-center justify-center h-full mx-8">
                <h1 className="text-3xl font-bold">Faça seu Login</h1>
                <p className='mt-1 mb-6 max-w-lg text-center text-slate-700 text-sm'>
                    Faça seu login para acessar sua conta, ou <Link href="/auth/signup" className="text-mainblue hover:text-mainbluehover hover:underline font-semibold">crie uma conta</Link>
                </p>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <input
                            {...register("email_or_cpf")}
                            id="email"
                            placeholder="E-mail ou CPF"
                            className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.email_or_cpf ? "border-red-500" : "border-slate-100 focus:border-mainblue"}  transition-all`}
                        />
                        <small className="ml-2 text-red-600 font-semibold">{errors.email_or_cpf?.message}</small>
                    </div>

                    <div className="mb-2">
                        <div className="flex bg-formbg rounded-lg">
                            <input
                                {...register("password")}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Senha"
                                className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.password ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                            />
                            <button
                                type="button"
                                className="toggle-password mx-6"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEye className="text-mainblue" /> : <FaEyeSlash className="text-mainblue" />}
                            </button>
                        </div>

                        <small className="ml-2 text-red-600 font-semibold">{errors.password?.message}</small>
                    </div>

                    <div className="flex text-textgrey justify-end mb-8">
                        <Link href="/auth/forgot-password" className="text-base hover:text-cyan-500">Esqueceu sua senha?</Link>
                    </div>
                    <button type="submit" className="bg-mainblue text-formbg py-3 text-base rounded-lg shadow-xl hover:bg-mainbluehover duration-100 ease-in-out w-full">
                        Login
                    </button>
                </form>
                <p className="font-base text-textgrey my-8 text-base">ou continue com</p>
                <div>
                    <ul className="flex gap-3">
                        <li>
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={handleGoogleLoginError}
                                text="signin_with"
                                context="signin"
                                useOneTap
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SignIn