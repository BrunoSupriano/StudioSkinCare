import React from 'react';

const ClienteForm = ({ handleSubmit, handleChange, formData = {} }) => { // Adiciona um valor padrão para formData
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="formlabel">Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome || ''} // Agora formData sempre será um objeto
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o nome"
                />
            </div>
            <div>
                <label className="formlabel">Celular</label>
                <input
                    type="text"
                    name="celular"
                    value={formData.celular || ''}
                    onChange={handleChange}
                    className="Custom-input"
                    placeholder="Digite o celular"
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
                <label className="formlabel">Aniversário</label>
                <input
                    type="date"
                    name="aniversario"
                    value={formData.aniversario || ''}
                    onChange={handleChange}
                    className="Custom-input"
                />
            </div>
        </form>
    );
};

export default ClienteForm;
