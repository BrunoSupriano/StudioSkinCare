import React from 'react';
import PopupForm from './PopUpForm.jsx';

const DeleteConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
    return (
        <PopupForm isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold mb-4">Tem certeza de que deseja excluir este cliente?</h2>
            <div className="flex justify-between mt-4">
                <button 
                    className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
                    onClick={onConfirm}
                >
                    Excluir
                </button>
                <button 
                    className="text-white bg-gray-500 hover:bg-gray-600 rounded px-4 py-2"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </PopupForm>
    );
};

export default DeleteConfirmationPopup;
