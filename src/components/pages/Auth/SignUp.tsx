"use client";

import RegisterSteps from "@/components/Auth/SignUp/TelaCadastro";
import { io } from "socket.io-client";

const SignUp = () => {
    var socket = io(process.env.BACKEND_BASE_URL as string);

    return (
        <div className="flex items-center ">
            <div className="mx-auto flex-1 max-h-screen overflow-none">
                <RegisterSteps />
            </div>
        </div>
    )
}

export default SignUp