"use client"

import { useEffect, useState } from "react"
import { Cadastro } from "./Cadastro"
import { Interesses } from "./Interesses"
import { TipoConta } from "./TipoConta"
import {
    Box,
    Progress,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    useToast,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "@/hooks/useApp"
import { goToStep } from "@/redux/reducers/signUpReducer"
import { EmailConfirm } from "./EmailConfirm"
import { createUser } from "@/server/services/authService"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next13-progressbar"
import { setUserInterests } from "@/server/services/interestService"

const steps = [
    { title: 'Tipo de Conta', description: 'Escolha o tipo de conta' },
    { title: 'Seus dados', description: 'Insira seus dados' },
    { title: 'Confirmação', description: 'Confirme seus dados' },
    { title: 'Seus Interesses', description: 'Personalize seus interesses' },
]

const TelaCadastro = () => {
    const [width, setWidth] = useState(0);
    const [loading, setLoading] = useState(false)

    const signUp = useAppSelector(state => state.signUp)
    const dispatch = useAppDispatch()

    const toast = useToast()
    const router = useRouter()
    const userSession = useSession()

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const handleStepOnClick = (index: number) => dispatch(goToStep(index))

    const handleCreateAccount = async () => {
        const { data, interestsSelected } = signUp

        if (activeStep == 3 && interestsSelected.length >= 3 && userSession.data?.user) {
            setLoading(true)

            await createUser(data.name, data.email, data.cpf, data.sector, data.role, data.password, data.accountType, data.phone_number)
            await setUserInterests(userSession.data?.user.id, signUp.interestsSelected)
            await signIn("credentials", { email: data.email, password: data.password, redirect: false })

            setLoading(false)

            toast({
                title: 'Conta criada com sucesso!',
                description: 'Agora você pode iniciar a jornada de negócios',
                status: 'success',
                position: 'top-right',
                duration: 2000,
                isClosable: true
            })

            router.push('/dashboard')
        }
    }

    useEffect(() => {
        const updateDimensions = () => setWidth(window.innerWidth)

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [])

    useEffect(() => {
        setActiveStep(signUp.step)
    }, [signUp.step])

    return (
        <div className="flex flex-col overflow-none  h-screen max-w-screen-xl mx-4 xl:mx-auto">
            <div className="my-6">
                <Stepper
                    index={activeStep}
                    className={`px-6 py-2 border border-slate-200  bg-slate-50 select-none ${loading ? 'pointer-events-none' : ''} ${loading ? 'rounded-t-lg ' : 'rounded-lg'}`}
                    orientation={width != 0 && width < 920 ? 'vertical' : 'horizontal'}
                >
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <div onClick={() => handleStepOnClick(index)} className="flex items-center gap-3 cursor-pointer">
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0' className="truncate">
                                    <StepTitle style={{ fontWeight: activeStep == index ? 700 : 600 }} className={activeStep == index ? 'text-sky-600 ' : ''}>{step.title}</StepTitle>
                                    <StepDescription className={activeStep == index ? 'text-sky-600' : ''}>{step.description}</StepDescription>
                                </Box>
                            </div>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

                {loading && <Progress size='xs' isIndeterminate />}
            </div>

            {activeStep == 3 && signUp.interestsSelected.length >= 3 &&
                <button className="text-white bg-mainblue border border-sky-600 rounded-lg px-6 py-2" onClick={handleCreateAccount}>Criar conta</button>
            }

            <div className="overflow-auto flex-1">
                {activeStep == 0 &&
                    <TipoConta />
                }

                {activeStep == 1 &&
                    <Cadastro />
                }

                {activeStep == 2 &&
                    <EmailConfirm />
                }

                {activeStep == 3 &&
                    <Interesses />
                }
            </div>
        </div >
    )
}

export default TelaCadastro