'use client'
import { Banner } from "@/components/Auth/Banner";
import { TelaCadastro } from "@/components/SignUp/TelaCadastro";


export default () => {

    return (
        <main className="h-screen flex items-center">
            <div className="">
                <Banner />
            </div>
            <div className="mx-auto w-96">
                <TelaCadastro />
            </div>
        </main>
    )   
}