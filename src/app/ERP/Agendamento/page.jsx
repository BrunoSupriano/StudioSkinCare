"use client";

const AgendamentoPage = () => {
    return (
        <div className="p-10 bg-pink-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-pink-800">Agendamento</h1>
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Gerenciar Agenda</h2>
                <p className="mb-4">Aqui você pode agendar procedimentos, editar dias/horários, e visualizar a agenda.</p>
                {/* Interface de Agendamento */}
                <div className="bg-pink-50 p-4 rounded">
                    <p>Componente de calendário interativo para visualização e gestão de agendamentos.</p>
                </div>
            </div>
        </div>
    );
};

export default AgendamentoPage;