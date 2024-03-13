export const Notifications = () => {
    return (
        <section className="flex flex-col gap-5">
            <h1 className="text-2xl">Notificações</h1>
            <section className="flex items-center justify-between">
                <span>
                    <h2 className="text-base">Ativar notificações de reuniões</h2>
                    <p className="text-xs text-gray-500">Permite que você saiba quando uma reunião está se aproximando.</p>
                </span>
                <p>ICONE</p>
            </section>
            <section className="flex items-center justify-between">
                <span>
                    <h2 className="text-base">Ativar indicador de mensagens não lidas</h2>
                    <p className="text-xs text-gray-500">Mostra um indicador vermelho no ícone de notificações quando houver mensagens não lidas</p>
                </span>
                <p>ICONE</p>
            </section>
        </section>
    )
}