"use client";

// pages/agendamento.js
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';

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
                <div key={index} className="bg-pink-50 p-4 rounded mb-2">
                    <p><strong>Cliente:</strong> {agendamento.cliente}</p>
                    <p><strong>Horário:</strong> {agendamento.horario}</p>
                    <p><strong>Serviço:</strong> {agendamento.servico}</p>
                </div>
            ));
    };

    return (
        <div className="p-10 bg-pink-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-pink-800">Agendamento</h1>
            <div className="bg-white p-6 rounded shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => handleDateChange(-1)} className="bg-pink-300 text-white py-2 px-4 rounded">
                        Anterior
                    </button>
                    <h2 className="text-xl font-bold">{format(selectedDate, 'dd/MM/yyyy')} ({diasDaSemana[selectedDate.getDay()]})</h2>
                    <button onClick={() => handleDateChange(1)} className="bg-pink-300 text-white py-2 px-4 rounded">
                        Próximo
                    </button>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-4">Agendamentos do Dia</h3>
                    {renderAgenda()}
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-4">Novo Agendamento</h3>
                    <div className="bg-pink-50 p-4 rounded">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-pink-800">Cliente</label>
                            <input
                                type="text"
                                value={newAgendamento.cliente}
                                onChange={(e) => setNewAgendamento({ ...newAgendamento, cliente: e.target.value })}
                                className="mt-1 block w-full p-2 border border-pink-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-pink-800">Horário</label>
                            <input
                                type="time"
                                value={newAgendamento.horario}
                                onChange={(e) => setNewAgendamento({ ...newAgendamento, horario: e.target.value })}
                                className="mt-1 block w-full p-2 border border-pink-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-pink-800">Serviço</label>
                            <input
                                type="text"
                                value={newAgendamento.servico}
                                onChange={(e) => setNewAgendamento({ ...newAgendamento, servico: e.target.value })}
                                className="mt-1 block w-full p-2 border border-pink-300 rounded"
                            />
                        </div>
                        <button
                            onClick={handleAgendar}
                            className="bg-pink-600 text-white py-2 px-4 rounded"
                        >
                            Agendar
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Editar Dias/Horários</h3>
                    <div className="bg-pink-50 p-4 rounded">
                        <p>Função para editar dias e horários ainda em desenvolvimento...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgendamentoPage;
