import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { signUpSchema } from "@/lib/validators/userValidator";
import { setData } from "@/redux/reducers/signUpReducer";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, ChangeEvent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

type Inputs = z.infer<typeof signUpSchema>

export const Cadastro = () => {
    const signUpData = useAppSelector(state => state.signUp.data)
    const dispatch = useAppDispatch()

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toast = useToast()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => { console.log(data) }

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>, key: keyof typeof signUpData) => {
        dispatch(setData({ ...signUpData, [key]: e.target.value }))
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePhoneNumberChange = () => {
        if (!signUpData.phone_number) return;

        const input = signUpData.phone_number.replace(/\D/g, '')
        let formattedInput = ''

        if (input.length <= 2) {
            formattedInput = `(${input}`
        } else if (input.length <= 6) {
            formattedInput = `(${input.slice(0, 2)}) ${input.slice(2)}`
        } else {
            formattedInput = `(${input.slice(0, 2)}) ${input.slice(2, 6)}-${input.slice(6)}`
        }

        dispatch(setData({ ...signUpData, phone_number: formattedInput }))
    };

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

    return (
        <section className="mt-6  max-h-screen max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold text-center">Preencha seus dados</h1>
            <p className='mb-6 text-center text-slate-700 text-sm'>
                Preencha os dados abaixo para se avancar no processo de cadastro
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
                        type="text"
                        className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.cpf ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold0">{errors.cpf?.message}</small>
                </div>

                <div className="-mb-3">
                    <input
                        placeholder="E-mail *"
                        {...register("email", { value: signUpData.email, onChange: e => handleValueChange(e, 'email') })}
                        className={`w-full text-base transition-all border-2  bg-formbg rounded-lg text-forminput py-3 px-4 outline-none  focus:text-zinc-600 ${errors.email ? "border-red-500" : "border-slate-100 focus:border-mainblue"}`}
                    />
                    <small className="ml-2 text-red-600 font-semibold0">{errors.email?.message}</small>
                </div>

                <div className="-mb-3">
                    <input
                        placeholder="Número de telefone"
                        {...register("phone_number", { value: signUpData.phone_number, onChange: e => handleValueChange(e, 'phone_number') })}
                        type="text"
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
            <p className="text-center text-forminput my-5 text-base">ou continue com</p>
            <nav>
                <ul className="flex items-center justify-center gap-5 cursor-pointer">
                    <li><a href="#"><FaFacebook size={40} color={"#0163E0"} /></a></li>
                    <li><a href="#"></a><FaApple size={40} /></li>
                    <li><a href="#"><FcGoogle size={40} /></a></li>
                </ul>
            </nav>
        </section>
    )
}