"use client";

import { User } from '@/types/Auth';
import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import { Progress } from '@chakra-ui/react';

type Props = {
    user: User
}

export const DashboardMeetingsSchendulePage = ({ user }: Props) => {
    const [value, setValue] = useState(() => dayjs(dayjs(new Date())));
    const [selectedValue, setSelectedValue] = useState(() => dayjs(dayjs(new Date())));

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200 ">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Minha agenda</span>
                <p className="text-sm text-slate-500">
                    Acesse seus encontros agendados, clique na data para ver os encontros!
                </p>
            </div>
            <Progress size='xs' isIndeterminate />

            <div className='select-none py-2  px-4 lg:px-8'>
                <Calendar
                    value={value}
                    onSelect={onSelect}
                    onPanelChange={onPanelChange}
                    validRange={[dayjs('2024-03-01'), dayjs(new Date()).add(4, 'years')]}
                />
            </div>
        </div >
    );
}