import React, { useCallback, useState } from 'react';

import { Calendar } from '@natscale/react-calendar';

import '@natscale/react-calendar/dist/main.css';

export const LeftSideCalendar = () => {
    const [value, setValue] = useState(new Date());

    const monthsLabel = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro',
    };

    const weekDaysLabel = {
        0: 'dom',
        1: 'seg',
        2: 'ter',
        3: 'qua',
        4: 'qui',
        5: 'sex',
        6: 'sáb',
    };


    const onChange = useCallback(
        (val) => {
            setValue(val);
        },
        [setValue],
    );

    return <Calendar
        value={value}
        onChange={onChange}
        monthsLabel={monthsLabel}
        weekDaysLabel={weekDaysLabel}
        fontSize={15} 
    />
}