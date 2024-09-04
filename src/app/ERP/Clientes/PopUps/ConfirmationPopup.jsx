import React from 'react';
import PopupForm from '../../../Components/PopUp/PopUpForm.jsx';

const ConfirmationPopup = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <PopupForm isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold mb-4">{message}</h2>
            <div className="flex justify-between mt-4">
                <button 
                    className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                    onClick={onConfirm}
                >
                    Confirmar
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

export default ConfirmationPopup;
