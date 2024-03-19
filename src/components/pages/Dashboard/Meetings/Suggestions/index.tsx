"use client";

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { User } from '@/types/Auth';
import { Progress, Spinner, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { SuggestionCard } from './SuggestionCard';
import { useChannel } from 'ably/react';
import Link from 'next/link';

type Props = {
    user: User
}

export const DashboardMeetingsSuggestionsPage = ({ user }: Props) => {
    const { meetingSuggestions, initLoaded, loading } = useAppSelector(state => state.meetingSuggestions)

    const toast = useToast()
    const dispatch = useAppDispatch()

    // Realtime update meetings suggestions
    const { channel } = useChannel('meetings-suggestions', `meeting-suggestion-update-per-${user.id}`, async (message) => {
        if (message.data.action === 'rejected') {
            toast({
                title: 'Uma sugestão foi recusada...',
                description: 'Seu parceiro recusou uma sugestão',
                status: 'info',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        }

        if (message.data.action === 'new_meeting') {
            toast({
                render: () => (
                    <div className='bg-white p-4 shadow-md rounded-lg border-2 border-mainblue px-6'>
                        <p className="text-slate-600 font-bold">Um novo <span className="text-mainblue">encontro</span> foi criado!</p>
                        <p className='text-sm'>Ambas as partes aceitaram a sugestão...</p>

                        <Link
                            href={`/dashboard/meetings/${message.data.id}`}
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
        }
    });

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Sugestões de encontros</span>
                <p className="text-sm text-slate-500">
                    Veja sugestões de encontros para potencializar os seus negócios!
                </p>
            </div>

            {loading && <Progress size='xs' isIndeterminate />}

            <div className='py-6 px-4 lg:px-8'>
                {loading &&
                    <div className='h-96 flex flex-col gap-4 items-center justify-center'>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            width={9}
                            height={9}
                        />

                        <span className='text-slate-500 font-bold text-sm'>Carregando sugestões...</span>
                    </div>
                }

                {!loading &&
                    <div>
                        {meetingSuggestions.map((meeting, key) => {
                            return (
                                <div className={key + 1 === meetingSuggestions.length ? '' : 'mb-6'} key={meeting.id}>
                                    <SuggestionCard
                                        user={user}
                                        data={meeting}
                                    />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    );
}