import React from 'react';

const ServiceForm = ({ handleSubmit, handleChange, servico }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
                <label className="formlabel">Nome do serviço:</label>
                <input
                    type="text"
                    name="nome"
                    value={servico?.nome || ''} // Exibe o nome existente ou vazio
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o nome do serviço"
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label className="formlabel">Valor (R$):</label>
                <input
                    type="number"
                    name="valor"
                    value={servico?.valor || ''} // Exibe o valor existente ou vazio
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o valor em reais"
                    step="0.01"
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label className="formlabel">Duração (hh:mm):</label>
                <input
                    type="time"
                    name="duracao"
                    value={servico?.duracao || ''} // Exibe a duração existente ou vazio
                    onChange={handleChange}
                    className="Custom-input"
                />
            </div>
        </form>
    );
};

export default ServiceForm;
