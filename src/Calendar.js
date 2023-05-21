import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ru';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import './Calendar.css';
// import './Selectslot';
moment.locale('ru');
const messages = {
    allDay: 'весь день',
    previous: '<',
    next: '>',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Сводка',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    showMore: (total) => `+ (${total}) Событий`,
    Comment: 'коментарий',
};

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
    const [open, setOpen] = React.useState(false);

    const [events, setEvents] = React.useState([
        {
            title: 'Ирин ДР',
            start: new Date(2023, 5, 23),
            end: new Date(2023, 5, 23),
            allDay: true,
        },
    ]);

    const onSelectSlot = useCallback((slotInfo) => {
        setOpen(true);
        // TODO: сохранить slotInfo в useState
        console.log(slotInfo);
        // const newEvent = {
        //     title: '#1',
        //     start: slotInfo.start,
        //     end: slotInfo.end,
        //     allDay: true,
        // };

        // setEvents((prevEvents) => [...prevEvents, newEvent]);
    }, []);

    return (
        <div style={{ background: 'white' }}>
            <Calendar
                views={['month', 'agenda']}
                defaultView='month'
                onSelectSlot={onSelectSlot}
                selectable
                localizer={localizer}
                events={events}
                messages={messages}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 500 }}
            />

            <SlidingPanel
                type={'right'}
                isOpen={open}
                size={30}
                backdropClicked={() => setOpen(false)}
            >
                <div>
                    <div>My Panel Content</div>
                    {/* TODO: сделать инпут для названия */}
                    <input />
                    {/* TODO: сделать выбор времени */}
                    {/* <button onClick={() => setOpenPanel(false)}>close</button> */}
                </div>
            </SlidingPanel>
            {/* если опен тру показывать окно */}
        </div>
    );
};

export default MyCalendar;
