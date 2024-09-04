import React from 'react';
import Popup from '../../../Components/PopUp/PopUpForm.jsx';
import ClienteForm from '../ClientForm.jsx';
import { useCliente } from '../ClienteContext.jsx';

const EditCliente = () => {
    const { isPopupOpen, isEditing, cliente, handleChange, saveCliente, deleteCliente, closePopup } = useCliente();

    return (
        <Popup isOpen={isPopupOpen} onClose={closePopup}>
            <h2 className="text-lg font-bold mb-4">
                {isEditing ? "Editar Cliente" : "Cadastrar Cliente"}
            </h2>
            {cliente && (
                <ClienteForm handleSubmit={saveCliente} handleChange={handleChange} cliente={cliente} />
            )}
            <div className="flex justify-between mt-4">
                {isEditing ? (
                    <>
                        <button 
                            className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
                            onClick={deleteCliente}
                        >
                            Excluir Cliente
                        </button>
                        <button 
                            className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                            onClick={saveCliente}
                        >
                            Salvar alterações
                        </button>
                    </>
                ) : (
                    <button 
                        className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                        onClick={saveCliente}
                    >
                        Cadastrar Cliente
                    </button>
                )}
            </div>
        </Popup>
    );
};

export default EditCliente;
