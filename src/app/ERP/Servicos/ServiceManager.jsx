import React, { useState } from 'react';
import axios from 'axios';
import ServiceForm from './ServiceForm';

const ServiceManager = () => {
    const [servico, setServico] = useState({
        nome: '',
        valor: '',
        duracao: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServico((prevServico) => ({
            ...prevServico,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!servico.nome || !servico.valor || !servico.duracao) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Enviar os dados ao backend
        axios
            .post('/api/servicos', servico)
            .then((response) => {
                alert('Serviço salvo com sucesso!');
                console.log(response.data);
                setServico({ nome: '', valor: '', duracao: '' }); // Limpa o formulário
            })
            .catch((error) => {
                console.error('Erro ao salvar serviço:', error);
                alert('Ocorreu um erro ao salvar o serviço.');
            });
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Cadastro de Serviço</h2>
            <ServiceForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                servico={servico}
            />
            <button
                type="submit"
                form="service-form"
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
            >
                Salvar
            </button>
        </div>
    );
};

export default ServiceManager;
