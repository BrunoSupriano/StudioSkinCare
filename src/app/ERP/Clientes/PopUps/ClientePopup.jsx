import React from 'react';
import PopupForm from '../../../Components/PopUp/PopUpForm.jsx';
import ClienteForm from '../ClientForm.jsx';
import { useCliente } from '../ClienteContext.jsx';

const ClientePopup = () => {
    const { isPopupOpen, isEditing, cliente, handleChange, saveCliente, deleteCliente, closePopup } = useCliente();

    return (
        <PopupForm isOpen={isPopupOpen} onClose={closePopup}>
            <h2 className="text-lg font-bold mb-4">
                {isEditing ? "Editar Cliente" : "Cadastrar Cliente"}
            </h2>
            <ClienteForm handleSubmit={saveCliente} handleChange={handleChange} cliente={cliente} />
            <div className={`flex justify-${isEditing ? 'between' : 'end'} mt-4`}>
                {isEditing && (
                    <button
                        className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
                        onClick={deleteCliente}
                        aria-label="Excluir Cliente"
                    >
                        Excluir Cliente
                    </button>
                )}
                <button
                    className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                    onClick={saveCliente}
                    aria-label={isEditing ? "Salvar alterações" : "Cadastrar Cliente"}
                >
                    {isEditing ? "Salvar alterações" : "Cadastrar Cliente"}
                </button>
            </div>
        </PopupForm>
    );
};

export default ClientePopup;