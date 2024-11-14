import React from 'react';

const ClienteForm = ({ handleSubmit, handleChange, formData = {} }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="formlabel">Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome || ''}
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o nome"
                />
            </div>
            <div>
                <label className="formlabel">Telefone</label>
                <input
                    type="text"
                    name="telefone"
                    value={formData.telefone || ''}
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o telefone"
                />
            </div>
            <div>
                <label className="formlabel">Endereço</label>
                <input
                    type="text"
                    name="endereco"
                    value={formData.endereco || ''}
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o endereço"
                />
            </div>
            <div>
                <label className="formlabel">CPF</label>
                <input
                    type="text"
                    name="cpf"
                    value={formData.cpf || ''}
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o CPF"
                />
            </div>
            <div>
                <label className="formlabel">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o email"
                />
            </div>
            <div>
                <label className="formlabel">Nascimento</label>
                <input
                    type="date"
                    name="nascimento"
                    value={formData.nascimento || ''}
                    onChange={handleChange}
                    className="Custom-input"
                />
            </div>
        </form>
    );
};

export default ClienteForm;
