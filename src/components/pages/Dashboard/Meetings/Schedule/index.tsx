"use client";

import { User } from '@/types/Auth';
import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Alert, Badge, Calendar } from 'antd';
import { Progress } from '@chakra-ui/react';
import { getMeetingsScheduled } from '@/server/meetingService';
import { Meeting } from '@/types/Meeting';
import Link from 'next/link';

type Props = {
    user: User
}

export const DashboardMeetingsSchendulePage = ({ user }: Props) => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(() => dayjs(dayjs(new Date())));
    const [selectedValue, setSelectedValue] = useState(() => dayjs(dayjs(new Date())));
    const [meetings, setMeetings] = useState<Meeting[]>([])

    const handleGetMeetingsScheduled = async (month: number, year: number) => {
        setLoading(true)
        const data = await getMeetingsScheduled(user.id, month, year)
        setLoading(false)
        setMeetings(data)
    }


    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);

        handleGetMeetingsScheduled(newValue.month() + 1, newValue.year())
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = meetings.filter((item) => dayjs(item.date).format('YYYY/MM/DD') === value.format('YYYY/MM/DD'));
        return (
            <ul className="events">
                {listData.map((item, key) => (
                    <li key={key}>
                        <Link href={`/dashboard/meetings/${item.id}`} className='text-ellipsis overflow-hidden'>
                            {`Encontro #${item.id}`}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    };


    useEffect(() => {
        handleGetMeetingsScheduled(new Date().getMonth() + 1, new Date().getFullYear())
    }, [])

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200 ">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Minha agenda</span>
                <p className="text-sm text-slate-500">
                    Acesse seus encontros agendados, clique na data para ver os encontros!
                </p>
            </div>
            {loading && <Progress size='xs' isIndeterminate />}

            <div className='select-none py-2  px-4 lg:px-8'>
                <Calendar
                    value={value}
                    onPanelChange={onPanelChange}
                    cellRender={dateCellRender}
                    validRange={[dayjs('2024-03-01'), dayjs(new Date()).add(4, 'years')]}
                />
            </div>
        </div >
    );
}