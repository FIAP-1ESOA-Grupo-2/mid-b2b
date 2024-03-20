"use client";

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { User } from '@/types/Auth';
import { Progress, Spinner, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useChannel } from 'ably/react';
import Link from 'next/link';
import { MeetingCard } from '@/components/Dashboard/MeetingCard';
import { setInitLoaded, setLoading, setMeetings } from '@/redux/reducers/meetingsReducer';
import { getMeetings } from '@/server/meetingService';

type Props = {
    user: User
}

export const DashboardMeetingsInProgressPage = ({ user }: Props) => {
    const { meetings, initLoaded, loading } = useAppSelector(state => state.meetings)

    const toast = useToast()
    const dispatch = useAppDispatch()

    const handleGetMeetings = async () => {
        if (!initLoaded) dispatch(setInitLoaded(true))

        dispatch(setLoading(true))
        dispatch(setMeetings(await getMeetings(user.id)))
        dispatch(setLoading(false))
    }

    useEffect(() => {
        handleGetMeetings()
    }, []) 

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Encontros em andamento</span>
                <p className="text-sm text-slate-500">
                    Veja os encontros em andamento, clique para ver os detalhes
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

                        <span className='text-slate-500 font-bold text-sm'>Carregando encontros...</span>
                    </div>
                }

                {!loading &&
                    <div>
                        {meetings.map((meeting, key) => {
                            return (
                                <div className={key + 1 === meetings.length ? '' : 'mb-6'} key={meeting.id}>
                                    <MeetingCard
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