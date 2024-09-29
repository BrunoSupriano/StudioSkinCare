import React from 'react';

const ClienteForm = ({ handleSubmit, handleChange, cliente }) => {
    // Garantir que cliente tenha um valor padrão
    const defaultCliente = cliente || { nome: '', celular: '', endereco: '', cpf: '', aniversario: '' };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="formlabel">Nome</label>
                <input type="text" name="nome" value={defaultCliente.nome} onChange={handleChange} className="Custom-input" placeholder="Digite o nome" />
            </div>
            <div>
                <label className="formlabel">Celular</label>
                <input type="text" name="celular" value={defaultCliente.celular} onChange={handleChange} className="Custom-input" placeholder="Digite o celular" />
            </div>
            <div>
                <label className="formlabel">Endereço</label>
                <input type="text" name="endereco" value={defaultCliente.endereco} onChange={handleChange} className="Custom-input" placeholder="Digite o endereço" />
            </div>
            <div>
                <label className="formlabel">CPF</label>
                <input type="text" name="cpf" value={defaultCliente.cpf} onChange={handleChange} className="Custom-input" placeholder="Digite o CPF" />
            </div>
            <div>
                <label className="formlabel">Aniversário</label>
                <input type="date" name="aniversario" value={defaultCliente.aniversario} onChange={handleChange} className="Custom-input" placeholder="Digite o aniversário" />
            </div>
        </form>
    );
};

export default ClienteForm;
