"use client";

import RegisterSteps from "@/components/Auth/SignUp/TelaCadastro";
import { useChannel } from "ably/react";

const SignUp = () => {
    const { channel, ably } = useChannel("get-started", (message) => {
       
    });

    channel.subscribe("message-1", (message) => {
        console.log("Message received: " + message.data)
    });

    return (
        <div className="flex items-center ">
            <div className="mx-auto flex-1 max-h-screen overflow-none">
                <RegisterSteps />
            </div>
        </div>
    )
}

export default SignUp