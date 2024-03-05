import { Voltar } from "../Voltar/Voltar"
import { Cadastro } from "./Cadastro"
import { Interesses } from "./Interesses"
import { TipoConta } from "./TipoConta"

export const TelaCadastro = () => {
    return (
        <section className="overflow-x-hidden sm:flex flex-col mx-auto my-auto">
            <section className="my-auto">
                <Voltar />
                <Cadastro/>
                {/* <TipoConta /> */}
                {/* <Interesses /> */}
            </section>
        </section>
    )
}