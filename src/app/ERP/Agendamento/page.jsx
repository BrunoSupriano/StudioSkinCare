"use client";
import React, { useState, useCallback, useEffect } from 'react'; // Adicionado useEffect
import moment from 'moment';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './agendamento.css';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import EventModal from './components/EventModal';
import Adicionar from './components/Adicionar';
import FiltroAtividades from './components/FiltroAtividades.jsx';
import 'moment/locale/pt-br';
import axios from 'axios'; // Importar axios

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Agendamento() {
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);

    moment.locale('pt-br')

    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(moment().toDate());

    // Função para carregar agendamentos do backend
    const carregarAgendamentos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/agendamento');
            
            // Converter os dados do backend para o formato do calendário
            const eventosFormatados = response.data.map(agendamento => ({
                id: agendamento.id,
                title: `${agendamento.cliente.nome} - ${agendamento.servico.nome}`,
                start: new Date(agendamento.dataHora),
                end: new Date(new Date(agendamento.dataHora).getTime() + 60*60*1000), // Adiciona 1 hora
                resource: agendamento, // Mantém os dados originais do agendamento
                tipo: agendamento.servico.nome // Para o filtro de atividades
            }));
            
            setEventos(eventosFormatados);
            setEventosFiltrados(eventosFormatados);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Carregar agendamentos quando o componente montar
    useEffect(() => {
        carregarAgendamentos();
    }, []);

    // Atualizar função moverEventos para persistir no backend
    const moverEventos = async (data) => {
        const { start, end, event } = data;
        try {
            const response = await axios.put(`http://localhost:8080/agendamento/${event.id}`, {
                id_cliente: event.resource.cliente.id,
                id_servico: event.resource.servico.id,
                dataHora: moment(start).format('YYYY-MM-DDTHH:mm:ss')
            });

            if (response.data) {
                await carregarAgendamentos(); // Recarrega todos os eventos
            }
        } catch (error) {
            console.error('Erro ao mover evento:', error);
            // Você pode adicionar um toast ou alerta aqui
        }
    };

    const handleEventClick = (evento) => {
        setEventoSelecionado(evento);
    };

    const handleEventClose = () => {
        setEventoSelecionado(null);
    };

    // Atualizar função handleAdicionar para incluir a chamada ao backend
    const handleAdicionar = async (novoEvento) => {
        try {
            await axios.post('http://localhost:8080/agendamento', {
                id_cliente: novoEvento.cliente.id,
                id_servico: novoEvento.servico.id,
                dataHora: moment(novoEvento.dataHora).format('YYYY-MM-DDTHH:mm:ss')
            });

            await carregarAgendamentos(); // Recarrega todos os eventos
        } catch (error) {
            console.error('Erro ao adicionar evento:', error);
            // Você pode adicionar um toast ou alerta aqui
        }
    };

    // Atualizar função handleEventDelete para incluir a chamada ao backend
    const handleEventDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8080/agendamento/${eventId}`);
            await carregarAgendamentos(); // Recarrega todos os eventos
            setEventoSelecionado(null);
        } catch (error) {
            console.error('Erro ao deletar evento:', error);
            // Você pode adicionar um toast ou alerta aqui
        }
    };

    // Atualizar função handleEventUpdate para incluir a chamada ao backend
    const handleEventUpdate = async (updatedEvent) => {
        try {
            await axios.put(`http://localhost:8080/agendamento/${updatedEvent.id}`, {
                id_cliente: updatedEvent.resource.cliente.id,
                id_servico: updatedEvent.resource.servico.id,
                dataHora: moment(updatedEvent.start).format('YYYY-MM-DDTHH:mm:ss')
            });

            await carregarAgendamentos(); // Recarrega todos os eventos
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            // Você pode adicionar um toast ou alerta aqui
        }
    };

    const handleSelecionarAtividades = (atividadesSelecionadas) => {
        setEventosFiltrados(atividadesSelecionadas);
    };

    const handleOnChangeView = (selectedView) => {
        setView(selectedView);
    };

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

    if (loading) {
        return <div>Carregando...</div>; // Ou um componente de loading mais elaborado
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="calendariocontainer">
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
                        toolbar={true}
                        messages={messages}
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
                <FiltroAtividades 
                    atividades={eventos} 
                    onSelecionarAtividades={handleSelecionarAtividades} 
                />
            </div>
        </div>
    );
}

export default Agendamento;