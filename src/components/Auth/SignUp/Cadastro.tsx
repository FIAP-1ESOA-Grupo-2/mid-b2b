import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { signUpSchema } from "@/lib/validators/userValidator";
import { goToNextStep, goToStep, setData, setLoading, setProvider } from "@/redux/reducers/signUpReducer";
import { hasAccountProvider } from "@/server/authProvidersService";
import { sendEmailVerification } from "@/server/authService";
import { ProfileGoogle } from "@/types/Auth";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState, ChangeEvent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFacebook, FaApple } from "react-icons/fa";
import { z } from "zod";

type Inputs = z.infer<typeof signUpSchema>

export const Cadastro = () => {
    const { data: signUpData, provider: signUpProvider } = useAppSelector(state => state.signUp)

    const dispatch = useAppDispatch()

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toast = useToast()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!signUpData.emailVerified) {
            toast.promise(sendEmailVerification(data.email), {
                success: { title: 'Email enviado com sucesso!ﾠﾠﾠﾠ', description: 'Insira o código de verificação...', position: 'top-right' },
                error: { title: 'Estamos em manutenção', description: 'Por favor tente mais tarde' },
                loading: { title: 'Enviando o email de verificação!', description: 'Por favor aguarde...', position: 'top-right' },
            })

            dispatch(goToNextStep())
        } else {
            dispatch(goToStep(3))
        }
    }

    // Providers Login
    const handleGoogleLoginSuccess = async (credential: CredentialResponse) => {
        if (!credential.credential) return;

        const profile: ProfileGoogle = jwtDecode(credential.credential)

        dispatch(setLoading({ title: 'Conectando com o Google...', isLoading: true }))
        const { data, errorCode } = await hasAccountProvider({ provider_id: profile.sub, provider: 'google' })

        if (errorCode == 'ACCOUNT_NOT_FOUND') {
            dispatch(setData({
                ...signUpData,
                name: profile.name,
                email: profile.email,
                emailVerified: profile.email_verified
            }))

            dispatch(setProvider({
                provider_id: profile.sub,
                provider: 'google'
            }))

            toast({
                title: 'Conectado com o Google!',
                description: "Agora preencha seus dados para avançar",
                status: 'success',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        }

        if (data) {
            toast({
                title: 'Faça login!',
                description: "Já existe uma conta vinculada com a conta do Google",
                status: 'info',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        }

        dispatch(setLoading({ title: '', isLoading: false }))
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

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>, key: keyof typeof signUpData) => {
        dispatch(setData({ ...signUpData, [key]: e.target.value }))
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePhoneNumberChange = () => {
        if (!signUpData.phone_number) return;

        let formattedInput: string = signUpData.phone_number.replace(/\D/g, '')
            .replace(/(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
                (_fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
                    if (country) return `${country} (${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
                    if (ddd || dddWithZero) return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
                    if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
                    return formattedInput;
                }
            );

        dispatch(setData({ ...signUpData, phone_number: formattedInput }))
    };

    const handleCPFChange = () => {
        let formattedInput = signUpData.cpf.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

        dispatch(setData({ ...signUpData, cpf: formattedInput }))
    }

    useEffect(() => {
        if (errors.name || errors.cpf || errors.email || errors.password || errors.sector || errors.role || errors.phone_number) {
            toast({
                title: 'Erro ao avançar',
                description: "Preencha todos os campos corretamente",
                status: 'error',
                position: 'top-right',
                duration: 1000,
                isClosable: true,
            })
        }
    }, [errors])

    useEffect(() => {
        handlePhoneNumberChange()
    }, [signUpData.phone_number])

    useEffect(() => {
        handleCPFChange()
    }, [signUpData.cpf])

    return (
        <section className="mt-6 pt-8  max-h-screen max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold text-center">Preencha seus dados</h1>
            <p className='mb-6 text-center text-slate-700 text-sm'>
                Preencha os dados abaixo para avançar no processo de cadastro!
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="-mb-3">
                    <input
                        placeholder="Nome completo *"
                        {...register("name", { value: signUpData.name, onChange: e => handleValueChange(e, 'name') })}
                        type="text"
                        className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.name ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold">{errors.name?.message}</small>
                </div>

                <div className="-mb-3">
                    <input
                        placeholder="CPF *"
                        {...register("cpf", { value: signUpData.cpf, onChange: e => handleValueChange(e, 'cpf') })}
                        value={signUpData.cpf}
                        maxLength={14}
                        type="text"
                        className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.cpf ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold0">{errors.cpf?.message}</small>
                </div>

                <div className="-mb-3">
                    <input
                        placeholder="E-mail *"
                        {...register("email", { value: signUpData.email, onChange: signUpData.emailVerified ? undefined : e => handleValueChange(e, 'email') })}
                        className={`w-full text-base transition-all border-2 ${signUpData.emailVerified ? 'bg-slate-200 text-zinc-400 border-slate-300 pointer-events-none' : 'bg-formbg text-forminput'} rounded-lg  py-3 px-4 outline-none  focus:text-zinc-600 ${errors.email ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold0">{errors.email?.message}</small>
                </div>

                <div className="-mb-3">
                    <input
                        placeholder="Número de telefone"
                        {...register("phone_number", { value: signUpData.phone_number, onChange: e => handleValueChange(e, 'phone_number') })}
                        value={signUpData.phone_number}
                        className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.phone_number ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold0">{errors.phone_number?.message}</small>
                </div>

                <div className="-mb-3">
                    <input
                        placeholder="Segmento da empresa que você atua"
                        {...register("sector", { value: signUpData.sector, onChange: e => handleValueChange(e, 'sector') })}
                        type="text"
                        className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.sector ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold0">{errors.sector?.message}</small>
                </div>

                <div className="-mb-3">
                    <input
                        placeholder="Área de atuação"
                        {...register("role", { value: signUpData.role, onChange: e => handleValueChange(e, 'role') })}
                        type="text"
                        className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.role ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold0">{errors.role?.message}</small>
                </div>

                <div className="-mb-3">
                    <div className="flex bg-formbg rounded-lg">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", { value: signUpData.password, onChange: e => handleValueChange(e, 'password') })}
                            placeholder="Senha *"
                            className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.password ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                        />
                        <button
                            type="button"
                            className="mx-6"
                            onClick={handleTogglePassword}>
                            {showPassword ? <FaEye size={18} className="text-mainblue" /> : <FaEyeSlash size={18} className="text-mainblue" />}
                        </button>
                    </div>
                    <small className="ml-2 text-red-600 font-semibold0">{errors.password?.message}</small>
                </div>

                <button type="submit" className="bg-mainblue text-formbg py-3 text-base rounded-lg shadow-xl hover:bg-mainbluehover duration-100 ease-in-out">Avançar</button>
            </form>

            <div className="pb-12">
                {!signUpProvider.provider &&
                    <>
                        <p className="text-center text-forminput my-5 text-base">ou continue com</p>
                        <div>
                            <ul className="flex items-center justify-center gap-5 cursor-pointer">
                                <li>
                                    <GoogleLogin
                                        onSuccess={handleGoogleLoginSuccess}
                                        onError={handleGoogleLoginError}
                                        text="signup_with"
                                        context="signup"
                                        shape="circle"
                                        type="icon"
                                    />
                                </li>
                                <li><a href="#"><FaFacebook size={36} color={"#0163E0"} /></a></li>
                                <li><a href="#"></a><FaApple size={37} /></li>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}