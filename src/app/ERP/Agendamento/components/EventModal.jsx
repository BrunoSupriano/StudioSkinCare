import React, { useState } from 'react';
import PopUpDescartar from '../../../Components/PopUp/PopUpDescartar';
import axios from 'axios';

const EventModal = ({ evento, onClose, onDelete, onUpdate }) => {
    const [editedEvent, setEditedEvent] = useState({ ...evento });
    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    };

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        if (startDate <= new Date(editedEvent.end)) {
            setEditedEvent({ ...editedEvent, start: startDate });
        }
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        if (endDate >= new Date(editedEvent.start)) {
            setEditedEvent({ ...editedEvent, end: endDate });
        }
    };

    const handleUpdate = () => {
        onUpdate(editedEvent);
        onClose();
    };

    const adjustDate = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0, -8);
    };

    const handleEventDelete = async (event) => {
        try {
            const eventId = event.id || event.resource.id;
            console.log('Deleting event with ID:', eventId);

            if (!eventId) {
                console.error('Event ID is missing');
                return;
            }

            await axios.delete(`http://localhost:8080/agendamento/${eventId}`);

            onDelete(eventId);
            onClose();
        } catch (error) {
            console.error('Erro ao deletar evento:', error);
            onClose();
        }
    };

    const confirmDelete = () => {
        setIsDiscardModalOpen(true);
    };

    const handleDiscard = () => {
        handleEventDelete(editedEvent);
        setIsDiscardModalOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="title text-center">Editar Agendamento</h2>
                <div className="mt-4">
                    <div className="mb-4">
                        <label className="formlabel block text-gray-700">Cliente:</label>
                        <p className="mt-1 w-full border rounded px-3 py-2 bg-gray-100">{editedEvent.title}</p>
                    </div>
                    <div className="mb-4">
                        <label className="formlabel block text-gray-700">Tipo:</label>
                        <p className="mt-1 w-full border rounded px-3 py-2 bg-gray-100">{editedEvent.tipo}</p>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="w-1/2 pr-2">
                            <label className="formlabel block text-gray-700">Data:</label>
                            <input
                                type="date"
                                name="date"
                                value={adjustDate(editedEvent.start).slice(0, 10)}
                                onChange={handleStartDateChange}
                                className="mt-1 w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="formlabel block text-gray-700">Início:</label>
                            <input
                                type="time"
                                name="start"
                                value={adjustDate(editedEvent.start).slice(11)}
                                onChange={handleStartDateChange}
                                className="mt-1 w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="formlabel block text-gray-700">Fim:</label>
                            <input
                                type="time"
                                name="end"
                                value={adjustDate(editedEvent.end).slice(11)}
                                onChange={handleEndDateChange}
                                className="mt-1 w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={confirmDelete}
                        className="Action"
                    >
                        Cancelar Agendamento
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="save"
                    >
                        Salvar Alterações
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    &times;
                </button>
            </div>

            {isDiscardModalOpen && (
                <PopUpDescartar isOpen={isDiscardModalOpen} onClose={() => setIsDiscardModalOpen(false)} onDiscard={handleDiscard} />
            )}
        </div>
    );
};

export default EventModal;