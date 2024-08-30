"use client";

// pages/agendamento.js
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import Sidebar from '../../Components/SideBar/SideBar.jsx';

const AgendamentoPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [agendamentos, setAgendamentos] = useState([]);
    const [newAgendamento, setNewAgendamento] = useState({
        cliente: '',
        horario: '',
        servico: '',
    });

    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const handleDateChange = (days) => {
        setSelectedDate(addDays(selectedDate, days));
    };

    const handleAgendar = () => {
        if (newAgendamento.cliente && newAgendamento.horario && newAgendamento.servico) {
            setAgendamentos([...agendamentos, { ...newAgendamento, date: selectedDate }]);
            setNewAgendamento({ cliente: '', horario: '', servico: '' });
        }
    };

    const renderAgenda = () => {
        return agendamentos
            .filter((agendamento) => format(agendamento.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
            .map((agendamento, index) => (
                <div key={index} className="bg-pink-600 p-4 rounded mb-2">
                    <p><strong>Cliente:</strong> {agendamento.cliente}</p>
                    <p><strong>Horário:</strong> {agendamento.horario}</p>
                    <p><strong>Serviço:</strong> {agendamento.servico}</p>
                </div>
            ));
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Agendamento</h1>
                    <p className="mb-4 text-pink-700">Selecione um mês para visualizar os lucros diários e obter insights financeiros.</p>
                    <div>
                        <div className="mb-6">
                            <div className="mb-4">
                                <label className="formlabel">Cliente</label>
                                <input
                                    type="text"
                                    value={newAgendamento.cliente}
                                    onChange={(e) => setNewAgendamento({ ...newAgendamento, cliente: e.target.value })}
                                    className="Custom-input"
                                    placeholder='Digite o Nome do cliente'
                                />
                            </div>
                            <div className="mb-4">
                                <label className="formlabel">Horário</label>
                                <input
                                    type="time"
                                    value={newAgendamento.horario}
                                    onChange={(e) => setNewAgendamento({ ...newAgendamento, horario: e.target.value })}
                                    className="Custom-input"
                                    placeholder='HH:MM'
                                />
                            </div>
                            <div className="mb-4">
                                <label className="formlabel">Serviço</label>
                                <input
                                    type="text"
                                    value={newAgendamento.servico}
                                    onChange={(e) => setNewAgendamento({ ...newAgendamento, servico: e.target.value })}
                                    className="Custom-input"
                                    placeholder='Digite o Nome do serviço'
                                />
                            </div>
                            <button onClick={handleAgendar} className="save">
                                Agendar
                            </button>
                        </div>
                        <div className="border border-pink-500 flex justify-between items-center mb-4 bg-white p-6 rounded shadow-md">
                            <button onClick={() => handleDateChange(-1)} className="Action">
                                Anterior
                            </button>
                            <h2 className="text-xl font-bold">{format(selectedDate, 'dd/MM/yyyy')} ({diasDaSemana[selectedDate.getDay()]})</h2>
                            <button onClick={() => handleDateChange(1)} className="Action">
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgendamentoPage;
