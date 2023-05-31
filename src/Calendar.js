import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ru';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import './Calendar.css';
import { v4 as uuidv4 } from 'uuid';

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
    const [isedditing, setediting] = React.useState(false);
    const [slotInfo, setSlotInfo] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [id, setId] = React.useState(null);
    const [events, setEvents] = React.useState([
        {
            title: 'Ирин ДР',
            start: new Date(2023, 5, 23),
            end: new Date(2023, 5, 23),
            allDay: true,
            id: uuidv4(),
        },
    ]);

    function onSave() {
        if (title == '') {
            alert(
                'Введите событие, оно у вас пустое... Не, ну в внатуре так сложно заполнить событие или что? Ты как вообще до этого дошёл? Ты кто по жизне вообще? Ты чей хлеб ска хаваешь? Ты начинаешь по тонкой дороге ходить мой друг, весьма тонкой и смотри по сторонам после таких поворотов на ней бывают и щели. Как провалишься, считай что, пиши -пропало. ',
            );
        } else {
            if (id == null) {
                // создание
                const newEvent = {
                    title: title,
                    start: slotInfo.start,
                    end: slotInfo.end,
                    allDay: true,
                    id: uuidv4(),
                };

                setEvents((prevEvents) => [...prevEvents, newEvent]);
            } else {
                // редактирование
                const index = events.findIndex((event) => event.id === id);
                const redevent = events[index];
                const updatedEvent = {
                    ...redevent,
                    title,
                };
                const newEvents = [...events];
                newEvents[index] = updatedEvent;
                setEvents(newEvents);
            }
            setOpen(false);
        }
    }

    // для создания события
    const onSelectSlot = useCallback((slotInfo) => {
        setOpen(true);
        setSlotInfo(slotInfo);
        setediting(true);
        setTitle('');
        console.log(slotInfo);
        setId(null);

        //
    }, []);
    // для редоктирования события
    const onSelectEvent = useCallback((calEvent) => {
        setOpen(true);
        setediting(false);
        setTitle(calEvent.title);
        setId(calEvent.id);
    }, []);

    return (
        <div style={{ background: 'white' }}>
            <div className='height600'></div>
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
                onSelectEvent={onSelectEvent}
                showAllEvents={true}
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
                        {isedditing ? (
                            <>
                                <textarea
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder='Впишу-ка я и сохраню их тут'
                                    autoFocus
                                    className='textpanel'
                                    value={title}
                                    ref={(el) => {
                                        el?.focus();
                                        el?.setSelectionRange(el.value.length, el.value.length);
                                    }}
                                />
                                <button onClick={() => onSave()} className='buttonpanel'>
                                    Ок
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{title}</div>
                                <button
                                    onClick={() => setediting(true)}
                                    type='submit'
                                    className='buttonpanel'
                                >
                                    Ред
                                </button>
                            </>
                        )}
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
