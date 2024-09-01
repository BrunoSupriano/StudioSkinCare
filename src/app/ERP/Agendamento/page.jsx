"use client";
import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './agendamento.css';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
    
import eventosPadrao from './components/eventosPadrao';
import EventModal from './components/EventModal';
import Adicionar from './components/Adicionar';
import FiltroAtividades from './components/FiltroAtividades.jsx';
    
    const DragAndDropCalendar = withDragAndDrop(Calendar)
    const localizer = momentLocalizer(moment);


    function Agendamento() {
        const [eventos, setEventos] = useState(eventosPadrao);
        const [eventoSelecionado, SeteventoSelecionado] = useState(null);
        const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);

        
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
            //Logica do banco
            setEventos([...eventos,{...novoEvento,id:eventos.length + 1}]);
        };

        const handleEventDelete= (eventId) =>{
             //Logica do banco
            const updatedEvents = eventos.filter((event) => event.id !== eventId)
            setEventos(updatedEvents);
            SeteventoSelecionado(null);
        };

        const handleEventUpdate = (updatedEvent) =>{
             //Logica do banco
            const updatedEvents = eventos.map((event) =>{
                if(event.id === updatedEvent.id){
                    return updatedEvent;
                }
                return event;
            });
            setEventos(updatedEvents);
            SeteventoSelecionado(null);
        }

        const handleSelecionarAtividades = (atividadesSelecionadas) =>{
            setEventosFiltrados(atividadesSelecionadas);
        }
        


        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className='calendariocontainer'>
                <div className='toolbar' style={{maxHeight:'100vh', overflowY:'auto'}}>
                    <div style={{ marginBottom: '20px' }}>
                        <Adicionar onAdicionar= {handleAdicionar}/>
                    </div>
                    <FiltroAtividades atividades={eventos} onSelecionarAtividades={handleSelecionarAtividades}/>
                </div>

                <div className='calendario'>
                    <DragAndDropCalendar
                        defaultDate={moment().toDate()}
                        defaultView='month'
                        events={eventosFiltrados}
                        localizer={localizer}
                        resizable
                        onEventDrop={moverEventos}
                        onEventResize={moverEventos}
                        onSelectEvent={handleEventClick}
                        className='calendar'
                    />
                </div>
                {eventoSelecionado && (
                    <EventModal evento={eventoSelecionado} onClose={handleEventClose}  onDelete={handleEventDelete} onUpdate={handleEventUpdate}/>
                )}
                </div>
            </div>
        );
    }


    export default Agendamento;