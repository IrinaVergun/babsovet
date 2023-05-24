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
    const [slotInfo, setSlotInfo] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [events, setEvents] = React.useState([
        {
            title: 'Ирин ДР',
            start: new Date(2023, 5, 23),
            end: new Date(2023, 5, 23),
            allDay: true,
        },
    ]);

    function onSave() {
        const newEvent = {
            title: title,
            start: slotInfo.start,
            end: slotInfo.end,
            allDay: true,
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    const onSelectSlot = useCallback((slotInfo) => {
        setOpen(true);
        setSlotInfo(slotInfo);

        console.log(slotInfo);
        //
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
                <div className='firstdivpanel'>
                    <div>Мои пиздатые планы на сегодня:</div>
                    <br></br>
                    {/* TODO: сделать инпут для названия */}{' '}
                    <div className='areaandbutton'>
                        <textarea
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder='Впишу-ка я и сохраню их тут'
                            autoFocus
                            className='textpanel'
                            value={title}
                        />
                        <button onClick={() => onSave()} className='buttonpanel'>
                            Ок
                        </button>
                        <button type='submit' className='buttonpanel'>
                            Ред
                        </button>
                    </div>
                    {/* TODO: сделать выбор времени */}
                    {/* <button onClick={() => setOpenPanel(false)}>close</button> */}
                </div>
                {/* сохранять сщстояние в юз стейт значение текст эрии,
                потом на клик сохрфнить использовать закоментированый код выше
                добовлять нью увент к состоянию */}
            </SlidingPanel>

            {/* если опен тру показывать окно */}
        </div>
    );
};

export default MyCalendar;
