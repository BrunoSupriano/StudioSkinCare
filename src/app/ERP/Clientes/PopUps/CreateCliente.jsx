import React from 'react';
import PopupForm from '../../../Components/PopUp/PopUpForm.jsx';
import ClienteForm from '../ClientForm.jsx';
import { useCliente } from '../ClienteContext.jsx';

const CreateCliente = () => {
    const { isPopupOpen, closePopup, saveCliente, handleChange, cliente } = useCliente();

    return (
        <PopupForm isOpen={isPopupOpen} onClose={closePopup}>
            <h2 className="text-lg font-bold mb-4">Cadastrar Cliente</h2>
            <ClienteForm handleSubmit={saveCliente} handleChange={handleChange} cliente={cliente} />
            <button
                className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2 mt-4"
                onClick={saveCliente}
            >
                Cadastrar Cliente
            </button>
        </PopupForm>
    );
};

export default CreateCliente;
