"use client";

import { User } from '@/types/Auth';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Avatar, AvatarBadge, FormControl, FormHelperText, Input, Progress, Spinner, Tooltip, useToast } from '@chakra-ui/react';
import { Meeting, MeetingMessage } from '@/types/Meeting';
import Link from 'next/link';
import { HiArrowSmLeft } from 'react-icons/hi';
import { MdAttachFile, MdOutlineDateRange, MdOutlineEmojiEmotions, MdOutlineLocalLibrary, MdSend } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { getMeetingMessages, sendMessage, updateMeeting } from '@/server/meetingService';
import { useChannel } from 'ably/react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import moment from 'moment';
import 'moment/locale/pt-br'
import { Calendar, Modal, Popconfirm } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'
import { FcLock } from "react-icons/fc";
import { useRouter } from 'next/navigation';
type Props = {
    user: User,
    meeting: Meeting
}

export const DashboardMeetingPage = ({ user, meeting }: Props) => {
    const chatBodyRef = useRef<HTMLDivElement | null>(null)

    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState<MeetingMessage[]>([])
    const [inputValue, setInputValue] = useState('')
    const [userOnline, setUserOnline] = useState(false)
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [modalDateVisible, setModalDateVisible] = useState(false)
    const [modalLocalVisible, setModalLocalVisible] = useState(false)
    const [dateInput, setDateInput] = useState('')
    const [meetingDate, setMeetingDate] = useState(meeting.date)
    const [meetingLocalInput, setMeetingLocalInput] = useState(meeting.local ?? '')
    const [meetingLocal, setMeetingLocal] = useState(meeting.local)
    const [meetingClosed, setMeetingClosed] = useState(meeting.closed)

    const toUserID = meeting.from_user_id == user.id ? meeting.to_user_id : meeting.from_user_id

    const toast = useToast()
    const router = useRouter()

    // Realtime update
    const { channel, ably } = useChannel(`meeting-${meeting.id}`)

    const handleGetMessages = async () => {
        setLoading(true)
        setMessages(await getMeetingMessages(meeting.id) as MeetingMessage[])
        setLoading(false)
    }

    const handleEmojiClick = async (event: any) => {
        setInputValue(inputValue + event.native)
    }

    const handleOnChangeDate = (value: Dayjs) => {
        setDateInput(value.format('YYYY-MM-DD'));
    };

    const handleUpdateDate = async () => {
        if (dateInput) {
            toast({
                title: 'Atualizando data de encontro...',
                description: 'Por favor aguarde',
                status: 'loading',
                position: 'top-right',
                duration: 10 * 1000,
                id: 'update-date-loading',
            })

            await updateMeeting(meeting.id, { date: dateInput })

            toast.close('update-date-loading')
            toast({
                title: 'Data de encontro atualizada!',
                description: 'Data de encontro atualizada com sucesso',
                status: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })

            channel.publish(`meeting-update-date`, { date: dateInput })
            ably.channels.get(`meetings-update-per-${toUserID}`).publish('update-meetings', {})

            const message = await sendMessage(meeting.id, user.id, 'Data do encontro foi atualizada', 'notification')
            channel.publish('new-message', { message })

            setModalDateVisible(false)
        }
    }

    const handleUpdateLocal = async () => {
        if (meetingLocalInput) {
            toast({
                title: 'Atualizando local de encontro...',
                description: 'Por favor aguarde',
                status: 'loading',
                position: 'top-right',
                duration: 10 * 1000,
                id: 'update-local-loading',
            })

            await updateMeeting(meeting.id, { local: meetingLocalInput })

            toast.close('update-local-loading')
            toast({
                title: 'Local de encontro atualizada!',
                description: 'Data de encontro atualizada com sucesso',
                status: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })

            channel.publish(`meeting-update-local`, { local: meetingLocalInput })
            ably.channels.get(`meetings-update-per-${toUserID}`).publish('update-meetings', {})

            const message = await sendMessage(meeting.id, user.id, 'Local do encontro foi atualizado', 'notification')
            channel.publish('new-message', { message })

            setModalLocalVisible(false)
        } else {
            toast({
                title: 'Local do encontro',
                description: 'Por favor, informe o local do encontro',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleCloseMeeting = async () => {
        toast({
            title: 'Encerrando o encontro...',
            description: 'Por favor aguarde',
            status: 'loading',
            position: 'top-right',
            duration: 10 * 1000,
            id: 'update-closed-loading',
        })

        await updateMeeting(meeting.id, { closed: true })

        toast.close('update-closed-loading')
        toast({
            title: 'Encontro encerrado!',
            description: 'Encontro encerrado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 3000,
            isClosable: true,
        })

        ably.channels.get(`meetings-update-per-${toUserID}`).publish('update-meetings', {})
        ably.channels.get(`meetings-closed-update-per-${toUserID}`).publish('update-meetings', {})

        channel.publish(`meeting-update-close`, { closed: true })

        router.refresh()
    }

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();

        if (!inputValue) return

        setInputValue('')
        setEmojiPickerOpen(false)

        const message = await sendMessage(meeting.id, user.id, inputValue)

        channel.publish('new-message', { message })
        channel.publish(`user-online-${toUserID}`, {})
    }

    // Realtime update for user online on meeting chat
    channel.subscribe(`user-online-${user.id}`, () => {
        setUserOnline(true)
    })

    // Realtime update for user offline on meeting chat
    channel.subscribe(`user-offline-${user.id}`, () => {
        setUserOnline(false)
    })

    // Realtime update for new message on meeting chat
    channel.subscribe('new-message', ({ data }) => {
        const message: MeetingMessage = data.message

        setMessages([...messages, message])
    })

    // Realtime update for meeting update date on meeting chat
    channel.subscribe(`meeting-update-date`, ({ data }) => {
        setMeetingDate(data.date)
    })

    // Realtime update for meeting update local on meeting chat 
    channel.subscribe(`meeting-update-local`, ({ data }) => {
        setMeetingLocal(data.local)
    })

    // Realtime update for meeting update close on meeting chat 
    channel.subscribe(`meeting-update-close`, ({ data }) => {
        setMeetingClosed(data.closed)
    })


    useEffect(() => {
        // Realtime update for user online on meeting chat
        channel.publish(`user-online-${toUserID}`, {})

        handleGetMessages()

        return () => {
            // Realtime update for user offline on meeting chat
            channel.publish(`user-offline-${toUserID}`, {})
        }
    }, [])


    useEffect(() => {
        chatBodyRef.current?.scrollTo({ behavior: 'smooth', top: chatBodyRef.current.scrollHeight })
    }, [messages])

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl border shadow-sm border-slate-200">
                <div className='flex gap-6 sm:gap-10 items-center flex-wrap   pt-5 pb-4 px-4 lg:px-8'>
                    <div className='flex-1 flex gap-4 items-center'>
                        <Link href={meetingClosed ? "/dashboard/meetings/closed" : "/dashboard/meetings/in-progress"}>
                            <HiArrowSmLeft className="text-slate-600 duration-200 cursor-pointer hover:text-mainblue" size={24} />
                        </Link>

                        <div>
                            <span className="text-xl font-bold text-slate-700">Encontro #{meeting.id}</span>

                            <div className='flex items-center gap-2 flex-wrap'>
                                <Tooltip label="Clique para mudar a data" visibility={meetingClosed ? 'hidden' : 'visible'}>
                                    <div onClick={meetingClosed ? () => { } : () => setModalDateVisible(true)} className='cursor-pointer flex items-center gap-2 mt-0.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 py-[1px] px-2 rounded-sm text-slate-600'>
                                        <MdOutlineDateRange size={15} />
                                        <div className='text-[12px] mt-[2px] font-bold flex-1'>{meetingDate ? meetingDate.toString() : 'A combinar'}</div>
                                    </div>
                                </Tooltip>

                                {!meetingClosed &&
                                    <Modal title="Data do encontro" okText="Salvar" open={modalDateVisible} onOk={handleUpdateDate} onCancel={() => setModalDateVisible(false)}>
                                        <Calendar defaultValue={meetingDate ? dayjs(meetingDate) : undefined} fullscreen={false} onChange={handleOnChangeDate} validRange={[dayjs('2024-03-01'), dayjs(new Date()).add(6, 'years')]} />
                                    </Modal>
                                }

                                <Tooltip label="Clique para mudar o local" visibility={meetingClosed ? 'hidden' : 'visible'}>
                                    <div onClick={meetingClosed ? () => { } : () => setModalLocalVisible(true)} className='cursor-pointer flex items-center gap-2 mt-0.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 py-[1px] px-2 rounded-sm text-slate-600'>
                                        <MdOutlineLocalLibrary size={15} />
                                        <div className='text-[12px] mt-[2px] font-bold flex-1'>{meetingLocal ? meetingLocal : 'A combinar'}</div>
                                    </div>
                                </Tooltip>

                                {!meetingClosed &&
                                    <Modal title="Local do encontro" okText="Salvar" open={modalLocalVisible} onOk={handleUpdateLocal} onCancel={() => setModalLocalVisible(false)}>
                                        <FormControl className='py-3'>
                                            <Input value={meetingLocalInput} onChange={e => setMeetingLocalInput(e.target.value)} type='email' placeholder='Ex: Online ou R. Augusta, 1524 - Consolação - SP, 01304-001' />
                                            <FormHelperText>Dica: Detalhe o local com o máximo de precisão possível, a fim de garantir uma compreensão mais clara.</FormHelperText>
                                        </FormControl>
                                    </Modal>
                                }
                            </div>
                        </div>
                    </div>

                    {meetingClosed ?
                        <div className='flex items-center gap-2'>
                            <FcLock size={24} />
                            <span className='text-slate-500 font-bold'>Encontro encerrado!</span>
                        </div>
                        :
                        <Popconfirm
                            title="Deseja encerrar o encontro?"
                            description="Essa ação não pode ser desfeita!"
                            onConfirm={handleCloseMeeting}
                            okText="Sim"
                            cancelText="Não"
                        >
                            <button
                                className="bg-mainblue hover:bg-mainbluehover w-full sm:w-auto text-white font-bold shadow-md hover:shadow-lg py-2 px-7 rounded-md transition-all order-1 md:order-2"
                            >
                                Encerrar encontro
                            </button>
                        </Popconfirm>
                    }
                </div>

                {loading && <Progress size='xs' isIndeterminate className='rounded-b-xl' />}
            </div>

            <div className='bg-white rounded-xl border shadow-sm border-slate-200'>
                <div className='flex justify-between border-b border-slate-200 py-5 px-4 lg:px-8'>
                    <div className='flex gap-4 items-center'>
                        <Avatar bg='#00ACFF' width={10} height={10} icon={<AiOutlineUser fontSize='1.3rem' />} >
                            {userOnline && <AvatarBadge boxSize='.9em' bg='green.500' />}
                        </Avatar>

                        <div>
                            <p className='text-slate-600 font-bold'>Parceiro (a)</p>
                            <small className='text-slate-400 -mt-1 block'>{userOnline ? 'Online no chat' : 'Offline'}</small>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col h-[600px] overflow-auto bg-slate-50' ref={chatBodyRef}>
                    {loading ?
                        <div className='h-full flex justify-center items-center'>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                width={9}
                                height={9}
                            />
                        </div>
                        :
                        messages.map((message, key) => (
                            message.type === 'text' ?

                                message.userId === user.id ?
                                    <div className='m-4 flex  flex-col items-end' key={key}>
                                        <div className='bg-mainblue  rounded-b-xl rounded-tl-xl text-white font-semibold w-fit max-w-[100%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%]   p-2 text-[15px] break-all'>
                                            {message.body}
                                        </div>
                                        <small className='text-slate-500 font-semibold select-none mr-2 mt-1'>{moment.unix(+message.createdAt).fromNow()}</small>
                                    </div>
                                    :
                                    <div className='my-2 mx-4' key={key}>
                                        <div className='border-2 rounded-b-xl rounded-tr-xl border-mainblue text-sky-600 font-semibold w-fit max-w-[100%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] p-2 text-[15px] break-all'>
                                            {message.body}
                                        </div>
                                        <small className='text-slate-500 font-semibold select-none ml-2'>{moment.unix(+message.createdAt).fromNow()}</small>
                                    </div>
                                :
                                <div className='m-4 flex  flex-col items-center' key={key}>
                                    <div className='bg-neutral-100  rounded-sm border-2 border-slate-300 text-slate-500 text-[12px] font-bold w-fit max-w-[100%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] py-1.5 px-2.5 break-all'>
                                        {message.body}
                                    </div>
                                    <small className='text-slate-500 text-[12px] font-semibold select-none  mt-1'>{moment.unix(+message.createdAt).fromNow()}</small>
                                </div>
                        ))
                    }
                </div>

                {(!meetingClosed && !loading) &&
                    <div className='border-t border-slate-200 relative'>
                        <div className={`absolute ${emojiPickerOpen ? 'bottom-[57px] opacity-100' : '-bottom-[550px] opacity-0'}  rounded-none duration-300`}>
                            <Picker data={data} onEmojiSelect={handleEmojiClick} />
                        </div>

                        <form className='flex items-center py-2' onSubmit={handleSendMessage}>
                            <button
                                type="button"
                                onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                                className="bg-transparent hover:bg-slate-100 text-slate-400  py-1.5 px-2 mx-1  rounded-full transition-all"
                            >
                                <MdOutlineEmojiEmotions size={24} />
                            </button>

                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder='Digite sua mensagem'
                                className="outline-none w-full   pr-1.5 text-md py-2 flex-1 placeholder:text-neutral-400 placeholder:font-normal font-semibold  text-slate-500 duration-200"
                            />

                            <button
                                type="button"
                                className="bg-transparent hover:bg-slate-100 text-mainblue   py-1.5 px-2.5 mr-2 rounded-md transition-all"
                            >
                                <MdAttachFile size={24} />
                            </button>

                            <button
                                type="submit"
                                className="bg-mainblue hover:bg-mainbluehover text-white  shadow-md hover:shadow-lg py-2 px-3 mr-2 rounded-md transition-all">
                                <MdSend size={20} />
                            </button>
                        </form>
                    </div>
                }
            </div>

        </div>
    );
}