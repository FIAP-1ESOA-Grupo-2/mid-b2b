"use client"

import { useEffect, useState } from "react"
import { Voltar } from "../Voltar/Voltar"
import { Cadastro } from "./Cadastro"
import { Interesses } from "./Interesses"
import { TipoConta } from "./TipoConta"
import {
    Box,
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

export default () => {
    const [width, setWidth] = useState(0);

    const signUp = useAppSelector(state => state.signUp)
    const dispatch = useAppDispatch()

    const { activeStep, setActiveStep, goToNext } = useSteps({
        index: 0,
        count: steps.length,
    })

    const handleStepOnClick = (index: number) => dispatch(goToStep(index))

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
            <Stepper
                index={activeStep}
                className="px-6 my-6 py-2 border border-slate-200 rounded-lg bg-slate-50 select-none"
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
                                <StepTitle style={{ fontWeight: 600 }}>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>
                        </div>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>

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

