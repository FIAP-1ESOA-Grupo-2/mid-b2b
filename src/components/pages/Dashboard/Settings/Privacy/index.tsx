import Link from "next/link"
import { HiArrowSmLeft } from "react-icons/hi"
import { PrivacyList } from "./PrivacyList"

export const DashboardSettingsPrivacyPage = () => {
    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8 flex gap-4 items-center">
                <Link className="" href="/dashboard/settings">
                    <HiArrowSmLeft className="text-slate-600 duration-200 cursor-pointer hover:text-mainblue" size={24} />
                </Link>

                <div>
                    <span className="text-xl font-bold text-slate-700">Politica de privacidade</span>
                    <p className="text-sm text-slate-500">
                        Saiba sobre nossa política de privacidade para os usuários!
                    </p>
                </div>
            </div>

            <div className="pt-5 pb-7 px-4 lg:px-8">
                <section className="flex flex-col gap-2">
                    <p className="text-sm xl:text-base text-gray-500 mb-1">Data de atualização: 04 de abril de 2024</p>
                    <p className="font-bold text-xs xl:text-sm text-gray-500">Tempo de leitura: 20 minutos</p>
                </section>
                <section className="flex flex-col gap-5 mt-6">
                    <PrivacyList 
                        title="Coleta de Informações" 
                        subtitle1="Dados de Registro" 
                        subtitle2="Interesses e Preferências" 
                        subtitle3="Dados de Interação" 
                        para1="Para utilizar nossa plataforma, os executivos devem fornecer informações específicas durante o processo de registro, incluindo, mas não se limitando a nome, detalhes de contato, área de atividade e segmento da empresa" 
                        para2="Coletamos dados sobre seus interesses e preferências profissionais para adequar eficazmente as oportunidades de parceria" 
                        para3="Nossa plataforma monitora suas interações, como as escolhas que você faz e as reuniões das quais participa, para aprimorar futuras correspondências e recomendações"
                    />
                    <PrivacyList 
                        title="Uso de Informações" 
                        subtitle1="Algoritmo de Correspondência" 
                        subtitle2="Gerenciamento de Reuniões" 
                        subtitle3="Melhoria e Personalização" 
                        para1="A funcionalidade central de nossa plataforma é combinar executivos com base nos dados de registro e em seus interesses. Esse processo é automatizado e projetado para sugerir potenciais parceiros, amizades, oportunidades de negócios e colaborações" 
                        para2="Usamos suas informações para organizar e gerenciar reuniões. As identidades dos participantes das reuniões permanecerão confidenciais até que o encontro ocorra" 
                        para3="Seus dados nos ajudam a melhorar a funcionalidade da plataforma e personalizar sua experiência, garantindo que as conexões feitas sejam valiosas e relevantes"
                    />
                    <PrivacyList 
                        title="Compartilhamento e Divulgação de Dados" 
                        subtitle1="Confidencialidade nas Reuniões" 
                        subtitle2="Prestadores de Serviços" 
                        subtitle3="Requisitos Legais" 
                        para1="Para manter o interesse e a confidencialidade das reuniões, não divulgaremos as identidades dos participantes uns aos outros antes da reunião agendada" 
                        para2="Podemos compartilhar suas informações com prestadores de serviços terceirizados confiáveis que nos ajudam a operar a plataforma, conduzir nosso negócio ou atender nossos usuários, desde que essas partes concordem em manter essa informação confidencial" 
                        para3="Podemos divulgar suas informações quando acreditarmos que a liberação é apropriada para cumprir a lei, fazer cumprir nossas políticas do site ou proteger nossos direitos, propriedade ou segurança, ou os de outros"
                    />
                    <PrivacyList 
                        title="Segurança dos Dados"
                        description="Implementamos uma variedade de medidas de segurança para manter a segurança de suas informações pessoais. Nossas medidas incluem, mas não se limitam a, criptografia de dados, servidores seguros e acordos de confidencialidade com terceiros que possam ter acesso às suas informações."
                        sectitle="Seus Direitos"
                        subtitle1="Acesso e Correção" 
                        subtitle2="Exclusão" 
                        subtitle3="Retirada do Consentimento" 
                        para1="Você tem o direito de acessar seus dados pessoais e corrigir quaisquer imprecisões" 
                        para2="Você pode solicitar a exclusão de seus dados, sujeito a restrições legais e operacionais" 
                        para3="Você tem o direito de retirar seu consentimento a qualquer momento, com efeito futuro"
                    />
                </section>
                <section className="mt-5">
                    <h1 className="text-xl text-mainblue">Alterações na Política de Privacidade</h1>
                    <p className="text-slate-500">Reservamo-nos o direito de atualizar esta política de privacidade a qualquer momento. Quando o fizermos, publicaremos uma notificação em nossa plataforma. Encorajamos você a verificar frequentemente esta política para quaisquer mudanças, para se manter informado sobre como estamos protegendo suas informações.</p>
                </section>
            </div>
        </div>
    )
}