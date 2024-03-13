"use client";

import { Label } from "./Label"
import { Input } from "./Input"
import { User, UserAccountType } from "@/types/Auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserSchema } from "@/lib/validators/userValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { updateUser } from "@/server/services/authService";
import { signIn } from "next-auth/react";
import { useRouter } from "next13-progressbar";

type Props = {
    user: User
}

export type Inputs = z.infer<typeof updateUserSchema>

export const DashboardProfilePage = ({ user }: Props) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(updateUserSchema)
    })

    const toast = useToast()
    const router = useRouter()

    const watchCpf = watch('cpf')
    const watchPhoneNumber = watch('phone_number')

    const [accountType, setAccountType] = useState(user.accountType)

    const handleSetAccountType = (accountType: UserAccountType) => setAccountType(accountType)

    const onSubmit = async (data: Inputs) => {
        toast({
            title: 'Atualizando perfil...',
            description: 'Por favor aguarde',
            status: 'loading',
            position: 'top-right',
            duration: 10 * 1000,
            id: 'update-user-loading',
        })

        const response = await updateUser(user.id, {
            ...data,
            accountType
        })

        if (!response.errorCode) {
            await signIn('credentials', {
                user: JSON.stringify(response.data),
                redirect: false
            })

            toast.close('update-user-loading')

            toast({
                title: 'Sucesso ao atualizar perfil!',
                description: 'Seu perfil foi atualizado com sucesso!',
                status: 'success',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })

            router.refresh()

            return;
        }

        if (response.errorCode) {
            toast.close('update-user-loading')

            toast({
                title: 'Erro ao atualizar perfil',
                description: response.error,
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        if (!watchCpf) return;

        let formattedInput = watchCpf.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

        setValue('cpf', formattedInput)
    }, [watchCpf])

    useEffect(() => {
        if (!watchPhoneNumber) return;

        let formattedInput: string = watchPhoneNumber.replace(/\D/g, '')
            .replace(/(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
                (_fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
                    if (country) return `${country} (${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
                    if (ddd || dddWithZero) return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
                    if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
                    return formattedInput;
                }
            );

        setValue('phone_number', formattedInput)
    }, [watchPhoneNumber])

    useEffect(() => {
        if (errors.name || errors.cpf || errors.new_password || errors.sector || errors.role || errors.phone_number) {
            toast({
                title: 'Erro ao atualizar perfil',
                description: "Preencha todos os campos corretamente",
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [errors])

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200 ">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-8">
                <span className="text-xl font-bold text-slate-700">Meu Perfil</span>
                <p className="text-sm text-slate-500">
                    Acesse e edite suas informações pessoais, depois clique em salvar!
                </p>
            </div>

            <form className="flex flex-col gap-6 p-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1">
                    <Label text="Tipo de conta: " required />
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => handleSetAccountType('buyer')}
                            className={`text-[15px] py-1.5 w-full border-2 outline-none border-mainblue transition-all ${accountType === 'buyer' ? 'bg-mainblue text-white' : 'text-mainblue hover:bg-blue-50 hover:border-blue-300'} rounded-l-lg `}>
                            Comprador
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSetAccountType('seller')}
                            className={`text-[15px] py-1.5 w-full border-2 outline-none border-mainblue transition-all ${accountType === 'seller' ? 'bg-mainblue text-white' : 'text-mainblue hover:bg-blue-50 hover:border-blue-300'} rounded-r-lg`}>
                            Vendedor
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-0.5">
                    <Label htmlfor="name" text="Nome: " required />
                    <Input
                        id="name"
                        placeholder="Ex. João da Silva"
                        register={register}
                        defaultValue={user.name}
                        errorMessage={errors.name?.message}
                    />
                </div>

                <div className="flex flex-col gap-0.5">
                    <Label htmlfor="cpf" text="CPF: " required />
                    <Input
                        id="cpf"
                        placeholder="Ex. 999.999.999-99"
                        register={register}
                        defaultValue={user.cpf}
                        errorMessage={errors.cpf?.message}
                    />
                </div>

                <div className="flex flex-col gap-0.5">
                    <Label htmlfor="phone_number" text="Número de telefone:" />
                    <Input
                        id="phone_number"
                        placeholder="Ex. (11) 99999-9999"
                        register={register}
                        defaultValue={user.phone_number ?? ''}
                        errorMessage={errors.phone_number?.message}
                    />
                </div>

                <div className="flex flex-col gap-0.5">
                    <Label htmlfor="sector" text="Segmento da empresa que você atua:" />
                    <Input
                        id="sector"
                        placeholder="Ex. Serviço"
                        register={register}
                        defaultValue={user.sector ?? ''}
                        errorMessage={errors.sector?.message}
                    />
                </div>

                <div className="flex flex-col gap-0.5">
                    <Label htmlfor="role" text="Área de atuação:" />
                    <Input
                        id="role"
                        placeholder="Ex. Administrativo"
                        register={register}
                        defaultValue={user.role ?? ''}
                        errorMessage={errors.role?.message}
                    />
                </div>

                <div className="flex flex-col gap-0.5">
                    <Label htmlfor="new_password" text="Nova senha:" />
                    <Input id="new_password" placeholder="Ex. Nova senha" register={register} errorMessage={errors.new_password?.message} />
                </div>

                <div className="mt-3">
                    <button
                        type="submit"
                        className={`py-2 w-full border-2 outline-none border-mainblue transition-all  bg-mainblue text-white hover:bg-mainbluehover hover:border-mainbluehover rounded-lg`}>
                        Salvar alterações
                    </button>
                </div>
            </form>
        </div>
    )
}