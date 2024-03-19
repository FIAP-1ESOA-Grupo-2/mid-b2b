import { Popconfirm, Tag } from 'antd';
import { MeetingSuggestion } from "@/types/Meeting";
import { User } from "@/types/Auth";
import { useToast } from "@chakra-ui/react";
import { acceptMeetingSuggestion, rejectMeetingSuggestion } from "@/server/services/meetingService";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { setMeetingSuggestions } from "@/redux/reducers/meetingSuggestionsReducer";
import { useChannel } from 'ably/react'
import Link from 'next/link';

type Props = {
    data: MeetingSuggestion,
    user: User
}

export const SuggestionCard = ({ data, user }: Props) => {
    const { meetingSuggestions } = useAppSelector(state => state.meetingSuggestions)

    const toast = useToast()
    const dispatch = useAppDispatch()
    const { channel } = useChannel('meetings-suggestions');

    const handleAccept = async () => {
        toast({
            title: 'Aceitando sugestão de encontro...',
            description: 'Por favor aguarde',
            status: 'loading',
            position: 'top-right',
            duration: 10 * 1000,
            id: 'accept-suggestion-loading',
        })

        dispatch(setMeetingSuggestions(meetingSuggestions.map((item) => {
            if (item.id === data.id) {
                if (data.from_user_id == user.id) {
                    return { ...item, from_user_accepted: true }
                }

                if (data.to_user_id == user.id) {
                    return { ...item, to_user_accepted: true }
                }
            }

            return item
        })))

        const response = await acceptMeetingSuggestion(data.id, user.id)

        toast.close('accept-suggestion-loading')

        if (response.action === 'new_meeting') {
            dispatch(setMeetingSuggestions(meetingSuggestions.filter((item) => item.id !== data.id)))
            
            toast({
                render: () => (
                    <div className='bg-white p-4 shadow-md rounded-lg border-2 border-mainblue px-6'>
                        <p className="text-slate-600 font-bold">Um novo <span className="text-mainblue">encontro</span> foi criado!</p>
                        <p className='text-sm'>Ambas as partes aceitaram a sugestão...</p>

                        <Link
                            href={`/dashboard/meetings/${data.id}`}
                            className="bg-mainblue mt-4 block text-center hover:bg-mainbluehover text-white font-semibold shadow-md py-1 rounded-md w-full transition-all"
                        >
                            Ver encontro
                        </Link>
                    </div>
                ),
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Sugestão aceita',
                description: 'Sugestão aceita com sucesso',
                status: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })
        }

        // Realtime update
        channel.publish(`meeting-suggestion-update-per-${data.from_user_id == user.id ? data.to_user_id : data.from_user_id}`, { id: data.id, action: response.action })
    }

    const handleDecline = async () => {
        toast({
            title: 'Recusando sugestão de encontro...',
            description: 'Por favor aguarde',
            status: 'loading',
            position: 'top-right',
            duration: 10 * 1000,
            id: 'accept-suggestion-loading',
        })

        dispatch(setMeetingSuggestions(meetingSuggestions.filter((item) => item.id !== data.id)))

        await rejectMeetingSuggestion(data.id)

        toast.close('accept-suggestion-loading')
        toast({
            title: 'Sugestão recusada',
            description: 'Sugestão recusada com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 3000,
            isClosable: true,
        })

        // Realtime update
        channel.publish(`meeting-suggestion-update-per-${data.from_user_id == user.id ? data.to_user_id : data.from_user_id}`, { id: data.id, action: 'rejected' })
    }

    return (
        <div
            className={`flex flex-col justify-between gap-6 sm:gap-12 p-6 items-center sm:flex-row bg-white rounded-lg border-2 shadow-md ${data.to_user_id == user.id ? 'border-mainblue' : 'border-slate-200'}`}
        >
            <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-600">Nova sugestão de encontro!</h2>

                {(data.from_user_id == user.id && data.to_user_accepted) || (data.to_user_id == user.id && data.from_user_accepted) ?
                    <Tag style={{ margin: '5px 0 2px 0' }} color="green"> Seu parceiro já aceitou!</Tag>
                    : ''}


                <p className="text-sm text-slate-500 mt-1 flex text-justify" >
                    Sugestão baseada em {data.matchups} interesses: {data.interests}
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full sm:w-auto">
                {(data.from_user_id == user.id && data.from_user_accepted) || (data.to_user_id == user.id && data.to_user_accepted) ?
                    <div className="text-center border-t pt-3 sm:border-none sm:p-0">
                        <p className="text-slate-600 font-bold">Você <span className="text-mainblue">aceitou</span> essa sugestão!</p>
                        <small>
                            Aguarde o seu parceiro aceitar, se quiser

                            <Popconfirm
                                title="Recusar essa sugestão?"
                                description="Essa ação não pode ser desfeita!"
                                onConfirm={handleDecline}
                                okText="Sim"
                                cancelText="Não"
                            >
                                <span className="text-red-500 cursor-pointer"> cancelar</span>
                            </Popconfirm>
                        </small>
                    </div>
                    :
                    <div className="flex flex-col md:flex-row gap-4">
                        <Popconfirm
                            title="Recusar essa sugestão?"
                            description="Essa ação não pode ser desfeita!"
                            onConfirm={handleDecline}
                            okText="Sim"
                            cancelText="Não"
                        >
                            <button
                                className="border-2 border-mainblue text-mainblue hover:text-red-500 hover:border-red-500 font-bold shadow-md py-2 px-6 rounded-md w-full transition-all order-2 md:order-1"
                            >
                                Recusar
                            </button>
                        </Popconfirm>

                        <button
                            onClick={handleAccept}
                            className="bg-mainblue hover:bg-mainbluehover text-white font-bold shadow-md py-2 px-14 rounded-md w-full transition-all order-1 md:order-2"
                        >
                            Aceitar
                        </button>
                    </div>
                }
            </div>
        </div >
    )
}