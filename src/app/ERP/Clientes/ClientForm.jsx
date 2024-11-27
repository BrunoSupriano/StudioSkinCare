import React from 'react';

const ClienteForm = ({ handleSubmit, handleChange, formData = {}, formErrors = {} }) => {
    const validateForm = () => {
        const { nome, telefone, cpf } = formData;
        if (!nome || !telefone || !cpf) {
            alert('Os campos Nome, Telefone e CPF são obrigatórios.');
            return false;
        }
        return true;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} id="clienteForm">
            <div>
                <label className="formlabel">Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome || ''}
                    onChange={handleChange}
                    className={`Custom-input ${formErrors.nome ? 'border-red-500' : ''}`}
                    placeholder="Digite o nome"
                    required
                />
                {formErrors.nome && <p className="text-red-500 text-sm">{formErrors.nome}</p>}
            </div>
            <div>
                <label className="formlabel">Telefone</label>
                <input
                    type="text"
                    name="telefone"
                    value={formData.telefone || ''}
                    onChange={handleChange}
                    className={`Custom-input ${formErrors.telefone ? 'border-red-500' : ''}`}
                    placeholder="Digite o telefone"
                    required
                />
                {formErrors.telefone && <p className="text-red-500 text-sm">{formErrors.telefone}</p>}
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
                    className={`Custom-input ${formErrors.cpf ? 'border-red-500' : ''}`}
                    placeholder="Digite o CPF"
                    required
                />
                {formErrors.cpf && <p className="text-red-500 text-sm">{formErrors.cpf}</p>}
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
