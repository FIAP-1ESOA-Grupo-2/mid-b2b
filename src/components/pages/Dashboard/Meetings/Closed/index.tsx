"use client";

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { User } from '@/types/Auth';
import { Progress, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useChannel } from 'ably/react';
import { MeetingCard } from '@/components/Dashboard/MeetingCard';
import { setInitLoadedClosed, setLoadingClosed, setMeetingsClosed } from '@/redux/reducers/meetingsReducer';
import { getMeetingsClosed } from '@/server/meetingService';
import { Empty } from 'antd';

type Props = {
    user: User
}

export const DashboardMeetingsClosedPage = ({ user }: Props) => {
    const { meetingsClosed, initLoadedClosed, loadingClosed } = useAppSelector(state => state.meetings)

    const dispatch = useAppDispatch()

    const { channel } = useChannel(`meetings-closed-update-per-${user.id}`, 'update-meetings', () => {
        handleGetMeetingsClosed()
    })

    const handleGetMeetingsClosed = async () => {
        if (!initLoadedClosed) dispatch(setInitLoadedClosed(true))

        dispatch(setLoadingClosed(true))
        dispatch(setMeetingsClosed(await getMeetingsClosed(user.id)))
        dispatch(setLoadingClosed(false))
    }

    useEffect(() => {
        handleGetMeetingsClosed()
    }, [])

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Encontros encerrados</span>
                <p className="text-sm text-slate-500">
                    Veja os encontros encerrados, clique para ver os detalhes
                </p>
            </div>

            {loadingClosed && <Progress size='xs' isIndeterminate />}

            <div className='py-6 px-4 lg:px-8'>
                {loadingClosed &&
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

                {!loadingClosed &&
                    <div>
                        {meetingsClosed.map((meeting, key) => {
                            return (
                                <div className={key + 1 === meetingsClosed.length ? '' : 'mb-6'} key={meeting.id}>
                                    <MeetingCard
                                        user={user}
                                        data={meeting}
                                    />
                                </div>
                            )
                        })}

                        {meetingsClosed.length === 0 &&
                            <div className='h-96 flex items-center justify-center'>
                                <Empty description="Nenhum encontro encerrado" />
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}