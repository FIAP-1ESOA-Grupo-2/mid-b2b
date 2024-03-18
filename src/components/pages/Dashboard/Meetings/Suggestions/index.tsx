"use client";

import { useAppSelector } from '@/hooks/useApp';
import { generateMeetings } from '@/server/services/meetingService';
import { User } from '@/types/Auth';
import { Progress, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';

type Props = {
    user: User
}

export const DashboardMeetingsSuggestionsPage = ({ user }: Props) => {
    const { meetingSuggestions, initLoaded, loading } = useAppSelector(state => state.meetingSuggestions)

    useEffect(() => {
        generateMeetings(user.id, user.accountType)
    }, [])

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Sugestões de encontros</span>
                <p className="text-sm text-slate-500">
                    Veja sugestões de encontros para potencializar os seus negócios!
                </p>
            </div>

            {loading && <Progress size='xs' isIndeterminate />}

            <div className='py-2  px-4 lg:px-8'>
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

            </div>
        </div>
    );
}