import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ru';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import './Calendar.css';
import { v4 as uuidv4 } from 'uuid';
import { createEvent, getEvents, editEvent } from './api';
import loader from './images/ZUiY.gif';

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

const MyCalendar = ({ userId, name }) => {
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
            color: 'green',
        },
    ]);
    const [zagruzka, goZagruzka] = React.useState(false);
    const [selectedOwner, setSelectedOwner] = React.useState(null);

    const pravo = name === 'forall' || userId === name;
    function updateEvents() {
        goZagruzka(true);
        getEvents(name).then((data) => {
            console.log(data);
            const events = data.events.map((event) => {
                const updatedEvent = {
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                };
                if (event.owner === 'irina') {
                    updatedEvent.color = '#ff4326';
                } else if (event.owner === 'anasteisha') {
                    updatedEvent.color = '#26afff';
                } else if (event.owner === 'julia') {
                    updatedEvent.color = '#ff8426';
                } else if (event.owner === 'forall') {
                    updatedEvent.color = '#11f211';
                }
                return updatedEvent;
            });
            setEvents(events);

            goZagruzka(false);
        });
    }
    useEffect(() => {
        updateEvents();
    }, []);

    async function onSave() {
        if (title == '') {
            alert(
                'Введите событие, оно у вас пустое... Не, ну в внатуре так сложно заполнить событие или что? Ты как вообще до этого дошёл? Ты кто по жизне вообще? Ты чей хлеб ска хаваешь? Ты начинаешь по тонкой дороге ходить мой друг, весьма тонкой и смотри по сторонам после таких поворотов на ней бывают и щели. Как провалишься, считай что, пиши -пропало. ',
            );
        } else {
            if (id == null) {
                // создание
                const newEvent = {
                    title: title,
                    start: slotInfo.start.valueOf(),
                    end: slotInfo.end.valueOf(),
                    allDay: true,
                    owner: name,
                };
                // setEvents((prevEvents) => [...prevEvents, newEvent]);
                await createEvent(newEvent);
                // TODO: вызвать здесб
            } else {
                // редактирование const editEvent = {

                const index = events.findIndex((event) => event.id === id);
                const predevent = events[index];
                const updatedEvent = {
                    ...predevent,
                    start: predevent.start.valueOf(),
                    end: predevent.end.valueOf(),
                    title,
                };
                await editEvent(id, updatedEvent);
            }
            updateEvents();
            setOpen(false);
        }
    }
    function onDelete() {
        const newEvent = {
            title: 0,
            start: 0,
            end: 0,
            allDay: 0,
            owner: 0,
        };
    }

    // для создания события

    const onSelectSlot = useCallback((slotInfo) => {
        if (pravo) {
            setOpen(true);
            setSlotInfo(slotInfo);
            setediting(true);
            setTitle('');
            setSelectedOwner(null);
            setId(null);
        }

        //
    }, []);
    // для редоктирования события
    const onSelectEvent = useCallback((calEvent) => {
        setOpen(true);
        setediting(false);
        setTitle(calEvent.title);
        setSelectedOwner(calEvent.owner);
        setId(calEvent.id);
    }, []);
    if (zagruzka === true) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src={loader} />
            </div>
        );
    }

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
                eventPropGetter={(event) => {
                    if (event.color) {
                        return {
                            style: {
                                backgroundColor: event.color,
                            },
                        };
                    }
                }}
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
                                {pravo &&
                                    (selectedOwner === 'forall' || selectedOwner === userId) && (
                                        <button
                                            onClick={() => setediting(true)}
                                            type='submit'
                                            className='buttonpanel'
                                        >
                                            Ред
                                        </button>
                                    )}
                                {/* <button onClick={() => onDelete()} className='buttonpanel'>
                                    х
                                </button> */}
                            </>
                        )}
                    </div>
                </div>
            </SlidingPanel>
        </div>
    );
};

export default MyCalendar;
