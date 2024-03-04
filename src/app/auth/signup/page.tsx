'use client'
import { Banner } from "@/components/Auth/Banner"
import { StepperSign } from "@/components/StepperSign/StepperSign"

export default () => {
    return (
        <div className="max-h-screen">
            <StepperSign />
            <Banner />
        </div>
    )   
}