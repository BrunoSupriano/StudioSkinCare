import React from 'react';
import PopupForm from './PopUpForm.jsx';

const SuccessPopup = ({ isOpen, onClose, message }) => {
    return (
        <PopupForm isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold mb-4">{message}</h2>
            <div className="flex justify-end mt-4">
                <button 
                    className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </PopupForm>
    );
};

export default SuccessPopup;
