"use client"

import { useEffect } from "react"
import { Cadastro } from "./Cadastro"
import { Interesses } from "./Interesses"
import { TipoConta } from "./TipoConta"
import {
    Box,
    Progress,
    Spinner,
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
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "@/hooks/useApp"
import { goToStep } from "@/redux/reducers/signUpReducer"
import { EmailConfirm } from "./EmailConfirm"

const steps = [
    { title: 'Tipo de Conta', description: 'Escolha o tipo de conta' },
    { title: 'Seus dados', description: 'Insira seus dados' },
    { title: 'Confirmação', description: 'Confirme seus dados' },
    { title: 'Seus Interesses', description: 'Personalize seus interesses' },
]

const TelaCadastro = () => {
    const signUp = useAppSelector(state => state.signUp)
    const dispatch = useAppDispatch()

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const handleStepOnClick = (index: number) => dispatch(goToStep(index))

    useEffect(() => {
        setActiveStep(signUp.step)
    }, [signUp.step])

    return (
        <div className="flex flex-col overflow-none  h-screen max-w-screen-xl mx-4 xl:mx-auto">
            <div className="my-6 hidden lg:block">
                <Stepper
                    index={activeStep}
                    className={`px-6 py-2 border border-slate-200  bg-slate-50 select-none ${signUp.loading.isLoading ? 'pointer-events-none' : ''} ${signUp.loading.isLoading ? 'rounded-t-lg ' : 'rounded-lg'}`}
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

                {signUp.loading.isLoading && <Progress size='xs' isIndeterminate />}
            </div>

            <div className="overflow-auto flex-1">
                {!signUp.loading.isLoading && activeStep == 0 &&
                    <TipoConta />
                }

                {!signUp.loading.isLoading && activeStep == 1 &&
                    <Cadastro />
                }

                {!signUp.loading.isLoading && activeStep == 2 &&
                    <EmailConfirm />
                }

                {!signUp.loading.isLoading && activeStep == 3 &&
                    <Interesses />
                }

                {signUp.loading.isLoading &&
                    <div className="h-full flex justify-center items-center flex-col gap-6">
                        <Spinner thickness='4px' color='blue.500' size='xl' />
                        <p className="text-sm font-bold text-slate-600">{signUp.loading.title}</p>
                    </div>
                }
            </div>
        </div >
    )
}

export default TelaCadastro