'use client'
import { Banner } from "@/components/Auth/Banner";
import { TelaCadastro } from "@/components/Auth/SignUp/TelaCadastro";


export default () => {

    return (
        <main className="h-screen flex items-center">
            <div className="">
                <Banner />
            </div>
            <div className="mx-auto w-1/2">
                <TelaCadastro />
            </div>
        </main>
    )   
}