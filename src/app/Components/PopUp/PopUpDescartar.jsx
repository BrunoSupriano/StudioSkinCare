import React from 'react';

const PopUpDescartar = ({ isOpen, onClose, onDiscard }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluir este agendamento?</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 mr-4"
                    >
                        Não
                    </button>
                    <button
                        onClick={onDiscard}
                        className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
                    >
                        Sim, excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUpDescartar;