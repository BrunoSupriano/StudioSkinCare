"use client";
import React, { useState, useCallback } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './agendamento.css';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import eventosPadrao from './components/eventosPadrao';
import EventModal from './components/EventModal';
import Adicionar from './components/Adicionar';
import FiltroAtividades from './components/FiltroAtividades.jsx';
import 'moment/locale/pt-br';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Agendamento() {
    const [eventos, setEventos] = useState(eventosPadrao);
    const [eventoSelecionado, SeteventoSelecionado] = useState(null);
    const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);

    moment.locale('pt-br')

    // Estado para gerenciar a visualização do calendário
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(moment().toDate());

    const moverEventos = (data) => {
        const { start, end } = data;
        const updatedEvents = eventos.map((event) => {
            if (event.id === data.event.id) {
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end),
                };
            }
            return event;
        });
        setEventos(updatedEvents);
    };

    const handleEventClick = (evento) => {
        SeteventoSelecionado(evento);
    };

    const handleEventClose = () => {
        SeteventoSelecionado(null);
    };

    const handleAdicionar = (novoEvento) => {
        setEventos([...eventos, { ...novoEvento, id: eventos.length + 1 }]);
    };

    const handleEventDelete = (eventId) => {
        const updatedEvents = eventos.filter((event) => event.id !== eventId);
        setEventos(updatedEvents);
        SeteventoSelecionado(null);
    };

    const handleEventUpdate = (updatedEvent) => {
        const updatedEvents = eventos.map((event) => {
            if (event.id === updatedEvent.id) {
                return updatedEvent;
            }
            return event;
        });
        setEventos(updatedEvents);
        SeteventoSelecionado(null);
    };

    const handleSelecionarAtividades = (atividadesSelecionadas) => {
        setEventosFiltrados(atividadesSelecionadas);
    };

    // Função para alternar entre as visualizações
    const handleOnChangeView = (selectedView) => {
        setView(selectedView);
    };

    // Função para navegar pelas datas
    const onNavigate = useCallback((newDate) => {
        setDate(newDate);
    }, []);

    const messages = {
        today: 'Hoje',
        previous: 'Voltar',
        next: 'Próximo',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        agenda: 'Eventos',
        date: 'Data',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'Nenhum evento neste período',
        showMore: total => `+ Ver mais (${total})`
    };


    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="calendariocontainer">
                {/* Mover a toolbar para cima */}
                <div className="calendario">
                    <DragAndDropCalendar
                        defaultDate={date}
                        date={date}
                        onNavigate={onNavigate}
                        view={view}
                        onView={handleOnChangeView}
                        events={eventosFiltrados}
                        localizer={localizer}
                        resizable
                        onEventDrop={moverEventos}
                        onEventResize={moverEventos}
                        onSelectEvent={handleEventClick}
                        className="calendar"
                        toolbar={true} // Desativa a toolbar padrão
                        messages={messages} // Adicione 'as mensagens aqui
                    />
                </div>
                {eventoSelecionado && (
                    <EventModal
                        evento={eventoSelecionado}
                        onClose={handleEventClose}
                        onDelete={handleEventDelete}
                        onUpdate={handleEventUpdate}
                        style={{ display: 'flex' }}
                    />
                )}
            </div>
            <div>
            <Adicionar onAdicionar={handleAdicionar} />
            <FiltroAtividades atividades={eventos} onSelecionarAtividades={handleSelecionarAtividades} />
            </div>
        </div>
    );
}

export default Agendamento;
