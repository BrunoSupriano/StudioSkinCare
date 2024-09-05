import { useState } from 'react';
import './Calendar.css'; // Importa o arquivo CSS moderno

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
                    <div key={day} className="day" onClick={() => addEvent(day)}>
                        <span>{day.getDate()}</span>
                        {events[day.toDateString()] && (
                            <ul className="events">
                                {events[day.toDateString()].map((event, idx) => (
                                    <li key={idx}>{event}</li>
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
