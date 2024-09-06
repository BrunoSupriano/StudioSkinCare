import { useState } from 'react';
import './Calendar.css'; // Importa o arquivo CSS

const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [events, setEvents] = useState({});

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const addEvent = (day) => {
        const title = prompt('Digite o nome do evento:');
        if (title) {
            const dateKey = day.toDateString();
            const newEvents = { ...events, [dateKey]: [...(events[dateKey] || []), title] };
            setEvents(newEvents);
        }
    };
    
    const editEvent = (oldDay, eventTitle) => {
        const newDateInput = prompt('Digite a nova data para o evento (no formato YYYY-MM-DD):');
        if (newDateInput) {
            const [year, month, day] = newDateInput.split('-');
            const newDay = new Date(year, month - 1, day);  // Corrigindo o mês
    
            const newDayKey = newDay.toDateString();
    
            // Remover o evento da data antiga
            const updatedEvents = { ...events };
            updatedEvents[oldDay] = updatedEvents[oldDay].filter((event) => event !== eventTitle);
    
            // Adicionar o evento à nova data
            if (!updatedEvents[newDayKey]) {
                updatedEvents[newDayKey] = [];
            }
            updatedEvents[newDayKey].push(eventTitle);
    
            setEvents(updatedEvents);
        }
    };

    const handleDragStart = (event, day, eventTitle) => {
        event.dataTransfer.setData('text/plain', JSON.stringify({ day: day.toDateString(), eventTitle }));
    };

    const handleDrop = (event, day) => {
        event.preventDefault();
        const eventData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const oldDay = eventData.day;
        const eventTitle = eventData.eventTitle;

        const oldEvents = { ...events };

        // Remover o evento da data antiga
        const filteredEvents = oldEvents[oldDay].filter((title) => title !== eventTitle);
        if (filteredEvents.length === 0) {
            delete oldEvents[oldDay];
        } else {
            oldEvents[oldDay] = filteredEvents;
        }

        // Adicionar o evento na nova data
        const newDayKey = day.toDateString();
        const newEvents = { ...oldEvents, [newDayKey]: [...(oldEvents[newDayKey] || []), eventTitle] };

        setEvents(newEvents);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const days = getDaysInMonth(currentYear, currentMonth);

    return (
        <div className="calendar-container">
            <div className="header">
                <button onClick={prevMonth}>Anterior</button>
                <h2>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h2>
                <button onClick={nextMonth}>Próximo</button>
            </div>

            <div className="days">
                {days.map((day) => (
                    <div
                        key={day}
                        className="day"
                        onClick={() => addEvent(day)}
                        onDrop={(e) => handleDrop(e, day)}
                        onDragOver={handleDragOver}
                    >
                        <span>{day.getDate()}</span>
                        {events[day.toDateString()] && (
                            <ul className="events">
                                {events[day.toDateString()].map((eventTitle, idx) => (
                                    <li
                                        key={idx}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, day, eventTitle)}
                                        onClick={() => editEvent(day.toDateString(), eventTitle)} // Adiciona a função de editar ao clicar no evento
                                    >
                                        {eventTitle}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
