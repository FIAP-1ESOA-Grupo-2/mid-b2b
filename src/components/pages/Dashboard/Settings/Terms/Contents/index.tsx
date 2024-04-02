import { ChangesinConditions } from "./ChangesinConditions"
import { PlatformResponsibilities } from "./PlatformResp"
import { PlatformLimitationsandDisclaimers } from "./Platformlimitdisc"
import { Recision } from "./Recision"
import { ServiceScope } from "./ServiceScope"
import { UserObligations } from "./UserObligations"

export const Contents = () => {
    return (
        <section>
            <h1 className="mb-5 text-slate-500">Bem-vindo à nossa plataforma de networking, onde nos esforçamos para conectar executivos de diversos setores a fim de potencializar oportunidades de amizades, negócios, parcerias e colaborações. Ao utilizar nosso serviço, você concorda com os seguintes termos e   condições:  
            </h1>
            <section className="flex flex-col gap-4">
                <ServiceScope />
                <PlatformResponsibilities />
                <PlatformLimitationsandDisclaimers />
                <UserObligations />
                <ChangesinConditions />
                <Recision />
            </section>
            <hr className="my-5"/>
            <section>
                <p className="text-slate-700 font-semibold">Ao se registrar em nossa plataforma, você reconhece que leu, entendeu e concordou com estes Termos de Uso. Aguardamos com expectativa a facilitação de conexões valiosas que possam enriquecer sua rede profissional e oportunidades.</p>
            </section>
        </section>
    )
}