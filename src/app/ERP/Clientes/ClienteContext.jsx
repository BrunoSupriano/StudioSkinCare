import React, { createContext, useState, useContext } from 'react';

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [cliente, setCliente] = useState(null);

    const openCreatePopup = () => {
        setCliente({ nome: '', celular: '', endereco: '', cpf: '', aniversario: '' });
        setIsEditing(false);
        setIsPopupOpen(true);
    };

    const openPopupForEdit = (cliente) => {
        setCliente(cliente);
        setIsEditing(true);
        setIsPopupOpen(true);
    };

    const saveCliente = () => {
        console.log(isEditing ? 'Cliente atualizado:' : 'Cliente criado:', cliente);
        setIsPopupOpen(false);
    };

    const deleteCliente = () => {
        console.log('Cliente excluído:', cliente);
        setIsPopupOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <ClienteContext.Provider value={{ isPopupOpen, isEditing, cliente, openCreatePopup, openPopupForEdit, saveCliente, deleteCliente, handleChange, closePopup }}>
            {children}
        </ClienteContext.Provider>
    );
};

export const useCliente = () => {
    const context = useContext(ClienteContext);
    if (context === undefined) {
        throw new Error('useCliente must be used within a ClienteProvider');
    }
    return context;
};
