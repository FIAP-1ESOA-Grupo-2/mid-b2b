"use client";

import RegisterSteps from "@/components/Auth/SignUp/TelaCadastro";

const SignUp = () => {
    return (
        <div className="flex items-center ">
            <div className="mx-auto  flex-1 max-h-screen overflow-none">
                <RegisterSteps />
            </div>
        </div>
    )
}

export default SignUp