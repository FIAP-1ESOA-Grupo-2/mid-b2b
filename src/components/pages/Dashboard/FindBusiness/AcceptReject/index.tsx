import { useState } from "react";

export const AcceptReject = () => {
    const [showConfirmation, setShowConfirmation] = useState(true);
    const [message, setMessage] = useState('');

    const handleAccept = () => {
        const acceptMessage = 'Aguardando outro usuário aceitar...'
        setMessage(acceptMessage);
        setShowConfirmation(false);
    };

    const handleReject = () => {
        const rejectedMessage = 'Encontro cancelado!'
        setMessage(rejectedMessage);
        setShowConfirmation(false);
    };
    return <section>
                {showConfirmation ? (
                    <div className="flex flex-row gap-4 sm:flex-col xl:flex-row">
                        <button className="bg-mainblue text-base py-3 px-10 w-full sm:px-16 text-white rounded-lg font-bold" onClick={handleAccept}>Aceitar</button>
                        <button className="bg-transparent text-base py-3 px-10 sm:px-16 text-mainblue border-2 border-mainblue rounded-lg font-bold" onClick={handleReject}>Recusar</button>
                    </div>
                ) : (
                    <p className="text-lg text-gray-500 leading-7">{message}</p>
                )}
            </section>
}