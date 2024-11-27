import React from 'react';

const ServiceForm = ({ handleSubmit, handleChange, formData: formData }) => {
    return (
        <form id="service-form" onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
                <label className="formlabel">Nome do serviço:</label>
                <input
                    type="text"
                    name="nome"
                    value={formData?.nome || ''}
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
                    value={formData?.valor || ''} 
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
                    value={formData?.duracao || ''} 
                    onChange={handleChange}
                    className="Custom-input"
                />
            </div>
        </form>
    );
};

export default ServiceForm;
