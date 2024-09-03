import React from 'react';

const ClienteForm = ({ handleSubmit, handleChange, cliente, isEditing }) => {
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="formlabel">Nome</label>
                <input type="text" name="nome" value={cliente.nome} onChange={handleChange} className="Custom-input" placeholder="Digite o nome" />
            </div>
            <div>
                <label className="formlabel">Celular</label>
                <input type="text" name="celular" value={cliente.celular} onChange={handleChange} className="Custom-input" placeholder="Digite o celular" />
            </div>
            <div>
                <label className="formlabel">Endereço</label>
                <input type="text" name="endereco" value={cliente.endereco} onChange={handleChange} className="Custom-input" placeholder="Digite o endereço" />
            </div>
            <div>
                <label className="formlabel">CPF</label>
                <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} className="Custom-input" placeholder="Digite o CPF" />
            </div>
            <div>
                <label className="formlabel">Aniversário</label>
                <input type="date" name="aniversario" value={cliente.aniversario} onChange={handleChange} className="Custom-input" />
            </div>
            <div className="flex justify-center">
                <button className="save bg-pink-500 text-white px-4 py-2 rounded">
                    {isEditing ? "Salvar Alterações" : "Cadastrar Cliente"}
                </button>
            </div>
        </form>
    );
};

export default ClienteForm;
