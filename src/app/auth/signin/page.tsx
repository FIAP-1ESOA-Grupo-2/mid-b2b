'use client';

import { Banner } from "@/components/Auth/Banner"
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from "@/lib/validators/userValidator";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from 'next13-progressbar';

type Inputs = z.infer<typeof signInSchema>

export default () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isToggled, setToggled] = useState(true);

    const { register, handleSubmit, formState: { errors, isLoading } } = useForm<Inputs>({
        resolver: zodResolver(signInSchema)
    })

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

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggle = () => {
        setToggled(!isToggled);
    };

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
        <div className='h-screen sm:flex flex-col items-center justify-center md:flex lg:grid grid-cols-2 w-screen overflow-hidden'>
            <div className="col-span-1 max-w-full">
                <Banner />
            </div>
            <div className="h-screen flex flex-col items-center justify-center col-span-1 mx-10 my-auto sm:w-screen sm:mx-10 md:w-full sm:px-10 lg:m-auto ">
                <h1 className="text-3xl lg:text-5xl mb-6 font-bold">Faça seu Login</h1>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6 ">
                        <input
                            {...register("email_or_cpf")}
                            id="email"
                            placeholder="E-mail ou CPF"
                            className={`w-full text-xl rounded-lg bg-formbg px-4 py-4 outline-none  border ${errors.email_or_cpf ? "border-red-500" : "border-slate-200"} transition-all`}
                        />
                        <small className="ml-2 text-red-600 font-semibold">{errors.email_or_cpf?.message}</small>
                    </div>

                    <div className="mb-6 ">
                        <div className={`flex items-center bg-formbg px-4 py-4 w-full rounded-lg border transition-all ${errors.password ? "border-red-500" : "border-slate-200 "}`}>
                            <input
                                {...register("password")}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Senha"
                                className="w-full text-xl  bg-transparent outline-none mr-2 "
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEye className="text-mainblue" /> : <FaEyeSlash className="text-mainblue" />}
                            </button>
                        </div>

                        <small className="ml-2 text-red-600 font-semibold">{errors.password?.message}</small>
                    </div>

                    <div className="flex flex-col md:flex-row text-xs text-textgrey justify-between mb-8">
                        <div className="fflex items-center gap-2 mb-4">
                            <input type="checkbox" id="remember" checked={isToggled} onChange={handleToggle} className="mr-2" />
                            <label htmlFor="remember" className="text-xl">Lembrar senha</label>
                        </div>
                        <a href="#" className="text-xl">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit" className="w-full text-xl bg-mainblue rounded-lg text-white px-6 py-4 hover:bg-mainbluehover ease-in-out duration-100">
                        Login
                    </button>
                </form>
                <p className="font-base text-textgrey my-8 text-base">ou continue com</p>
                <div>
                    <ul className="flex gap-3">
                        <li className="cursor-pointer"><FaApple size={40} /></li>
                        <li className="cursor-pointer"><FaFacebook className="text-[#0163E0]" size={40} /></li>
                        <li className="cursor-pointer"><FcGoogle size={40} /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}