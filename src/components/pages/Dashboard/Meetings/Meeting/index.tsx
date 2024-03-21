"use client";

import { User } from '@/types/Auth';
import React, { FormEvent, useEffect, useState } from 'react';
import { Avatar, AvatarBadge, Progress, Spinner, useToast } from '@chakra-ui/react';
import { Meeting, MeetingMessage } from '@/types/Meeting';
import Link from 'next/link';
import { HiArrowSmLeft } from 'react-icons/hi';
import { MdAttachFile, MdOutlineDateRange, MdOutlineLocalLibrary, MdSend } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { getMeetingMessages, sendMessage } from '@/server/meetingService';
import moment from 'moment';
import 'moment/locale/pt-br'

type Props = {
    user: User,
    meeting: Meeting
}

export const DashboardMeetingPage = ({ user, meeting }: Props) => {
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState<MeetingMessage[]>([])
    const [inputValue, setInputValue] = useState('')

    const handleGetMessages = async () => {
        setLoading(true)
        setMessages(await getMeetingMessages(meeting.id))
        setLoading(false)
    }

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();

        if (!inputValue) return

        await sendMessage(meeting.id, user.id, inputValue)

        // TODO: Realtime update


        setInputValue('')
    }


    useEffect(() => {
        handleGetMessages()
    }, [])

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl border shadow-sm border-slate-200">
                <div className='flex gap-6 sm:gap-10 items-center flex-wrap   pt-5 pb-4 px-4 lg:px-8'>
                    <div className='flex-1 flex gap-4 items-center'>
                        <Link href="/dashboard/meetings/in-progress">
                            <HiArrowSmLeft className="text-slate-600 duration-200 cursor-pointer hover:text-mainblue" size={24} />
                        </Link>

                        <div>
                            <span className="text-xl font-bold text-slate-700">Encontro #{meeting.id}</span>

                            <div className='flex items-center gap-2 flex-wrap'>
                                <div className='flex items-center gap-2 mt-0.5 bg-slate-100 border border-slate-300 py-[1px] px-2 rounded-sm text-slate-600'>
                                    <MdOutlineDateRange size={15} />
                                    <div className='text-[12px] mt-[2px] font-bold flex-1'>{meeting.date ? meeting.date.toString() : 'A combinar'}</div>
                                </div>
                                <div className='flex items-center gap-2 mt-0.5 bg-slate-100 border border-slate-300 py-[1px] px-2 rounded-sm text-slate-600'>
                                    <MdOutlineLocalLibrary size={15} />
                                    <div className='text-[12px] mt-[2px] font-bold flex-1'>{meeting.local ? meeting.local : 'A combinar'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="bg-mainblue hover:bg-mainbluehover w-full sm:w-auto text-white font-bold shadow-md hover:shadow-lg py-2 px-7 rounded-md transition-all order-1 md:order-2"
                    >
                        Encerrar encontro
                    </button>
                </div>

                {loading && <Progress size='xs' isIndeterminate className='rounded-b-xl' />}
            </div>

            <div className='bg-white rounded-xl border shadow-sm border-slate-200'>
                <div className='flex justify-between border-b border-slate-200 py-5 px-4 lg:px-8'>
                    <div className='flex gap-4 items-center'>
                        <Avatar bg='#00ACFF' width={10} height={10} icon={<AiOutlineUser fontSize='1.3rem' />} >
                            <AvatarBadge boxSize='.9em' bg='green.500' />
                        </Avatar>

                        <div>
                            <p className='text-slate-600 font-bold'>Parceiro (a)</p>
                            <small className='text-slate-400 -mt-1 block'>Online</small>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col h-[600px] overflow-auto bg-slate-50'>
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
                        messages.map(message => (
                            message.userId === user.id ?
                                <div className='m-4 flex  flex-col items-end' key={message.id}>
                                    <div className='bg-mainblue  rounded-b-xl rounded-tl-xl text-white font-semibold w-fit max-w-[100%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%]   p-2 text-[15px] break-all'>
                                        {message.body}
                                    </div>
                                    <small className='text-slate-500 font-semibold select-none mr-2 mt-1'>{moment.unix(+message.createdAt).fromNow()}</small>
                                </div>
                                :
                                <div className='my-2 mx-4' key={message.id}>
                                    <div className='border-2 rounded-b-xl rounded-tr-xl border-mainblue text-sky-600 font-semibold w-fit max-w-[100%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] p-2 text-[15px] break-all'>
                                        {message.body}
                                    </div>
                                    <small className='text-slate-500 font-semibold select-none ml-2'>{moment.unix(+message.createdAt).fromNow()}</small>
                                </div>
                        ))

                    }
                </div>

                <div className='border-t border-slate-200'>
                    <form className='flex items-center py-2' onSubmit={handleSendMessage}>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='Digite sua mensagem'
                            className="outline-none w-full pl-4 pr-1.5 text-md py-2 flex-1 placeholder:text-neutral-400 placeholder:font-normal font-semibold  text-slate-500 duration-200"
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
            </div>

        </div>
    );
}