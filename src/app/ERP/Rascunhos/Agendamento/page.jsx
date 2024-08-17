"use client";

import React, { useState } from 'react';
import { Calendar } from "@nextui-org/calendar";
import { fromDate } from "@internationalized/date"; // Importe o fromDate

function App() {
    const [selectedDate, setSelectedDate] = useState(fromDate(new Date())); // Use fromDate

    const handleSelect = (date) => {
        setSelectedDate(date);
        console.log("Data selecionada:", date);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Daros Glow Care</h1>
                <div className="flex space-x-4">
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Clientes</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Serviços</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Agenda</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Financeiro</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout →</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-4 bg-gray-100 rounded-t-lg">
                        <h2 className="text-lg font-bold">Novo Agendamento</h2>
                    </div>
                    <div className="p-4">
                        <Calendar
                            value={selectedDate}
                            onChange={handleSelect}
                            style={{ width: '100%', height: '600px' }} // Ajuste a altura e largura conforme necessário
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-4 bg-gray-100 rounded-t-lg">
                        <h2 className="text-lg font-bold">Próximas Sessões</h2>
                    </div>
                    <div className="p-4">
                        {/* Renderiza as próximas sessões aqui */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
