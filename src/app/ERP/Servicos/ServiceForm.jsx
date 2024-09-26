import React from 'react';

const ServiceForm = ({ handleSubmit, handleChange, formData: formData }) => {
    // const defaultServico = servico || { nome: '', duracao: '', valor: ''};

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="formlabel">Nome do serviço:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="Custom-input" placeholder="Digite o nome do serviço" />
            </div>
            <div>
                <label className="formlabel">Duração (min):</label>
                <input type="text" name="duracao" value={formData.duracao} onChange={handleChange} className="Custom-input" placeholder="Digite a duração em minutos" />
            </div>
            <div>
                <label className="formlabel">Valor (R$):</label>
                <input type="text" name="valor" value={formData.valor} onChange={handleChange} className="Custom-input" placeholder="Digite o valor em reais" />
            </div>
        </form>
    );
};

export default ServiceForm;
