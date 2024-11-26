import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

function Adicionar({ onAdicionar }) {
    const [novoEvento, setNovoEvento] = useState({
        cliente: {
            id: '',
            nome: ''
        },
        servico: {
            idServico: '',
            nome: '',
            duracao: ''
        },
        dataHora: '',
    });
    const [expanded, setExpanded] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [clientesResponse, servicosResponse] = await Promise.all([
                    fetch('http://localhost:8080/cliente'),
                    fetch('http://localhost:8080/servicos')
                ]);

                if (!clientesResponse.ok) {
                    throw new Error(`Erro ao buscar clientes: ${clientesResponse.statusText}`);
                }
                if (!servicosResponse.ok) {
                    throw new Error(`Erro ao buscar serviços: ${servicosResponse.statusText}`);
                }

                const clientesData = await clientesResponse.json();
                const servicosData = await servicosResponse.json();

                console.log('Serviços carregados:', servicosData);
                
                setClientes(Array.isArray(clientesData) ? clientesData : []);
                setServicos(Array.isArray(servicosData) ? servicosData : []);
            } catch (error) {
                setError(error.message);
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'cliente') {
            const selectedClient = clientes.find(c => c.id === parseInt(value));
            setNovoEvento(prev => ({
                ...prev,
                cliente: selectedClient 
                    ? { id: selectedClient.id, nome: selectedClient.nome }
                    : { id: '', nome: '' }
            }));
        } 
        else if (name === 'servico') {
            const selectedService = servicos.find(s => s.idServico === parseInt(value));
            console.log('Serviço selecionado:', selectedService);
            setNovoEvento(prev => ({
                ...prev,
                servico: selectedService 
                    ? { 
                        idServico: selectedService.idServico,
                        nome: selectedService.nome,
                        valor: selectedService.valor,
                        duracao: selectedService.duracao
                    }
                    : { idServico: '', nome: '', duracao: '' }
            }));
        }
        else if (name === 'dataHora') {
            setNovoEvento(prev => ({
                ...prev,
                dataHora: value
            }));
        }
    };

    // Função para calcular a data final baseada na duração do serviço
    const calcularDataFinal = (dataInicial, duracao) => {
        const [horas, minutos] = duracao.split(':').map(Number);
        const dataFinal = new Date(dataInicial);
        dataFinal.setHours(dataFinal.getHours() + horas);
        dataFinal.setMinutes(dataFinal.getMinutes() + minutos);
        return dataFinal;
    };

    // Função para formatar a data no formato esperado pela API
    const formatarData = (data) => {
        return data.toISOString().slice(0, 19);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataInicial = new Date(novoEvento.dataHora);
            const dataFinal = calcularDataFinal(dataInicial, novoEvento.servico.duracao);

            const agendamentoData = {
                id_cliente: parseInt(novoEvento.cliente.id),
                id_servico: parseInt(novoEvento.servico.idServico),
                dataInicial: formatarData(dataInicial),
                dataFinal: formatarData(dataFinal),
                status: 1
            };

            console.log('Dados do agendamento a serem enviados:', agendamentoData);

            const response = await fetch('http://localhost:8080/agendamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendamentoData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao salvar agendamento');
            }

            const responseData = await response.json();

            const eventoCalendario = {
                title: `${novoEvento.cliente.nome} - ${novoEvento.servico.nome}`,
                start: dataInicial,
                end: dataFinal,
                resource: responseData
            };

            onAdicionar(eventoCalendario);

            // Reset form
            setNovoEvento({
                cliente: { id: '', nome: '' },
                servico: { idServico: '', nome: '', duracao: '' },
                dataHora: ''
            });

            alert('Agendamento salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            alert('Erro ao salvar o agendamento: ' + error.message);
        }
    };

    if (loading) return <div className="text-center p-4">Carregando...</div>;
    if (error) return <div className="text-center p-4 text-danger">{error}</div>;

    return (
        <div className="formfilter">
            <h3 className="title-h3 text-center">Adicionar Agendamento</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicClient" className="mb-3">
                    <Form.Label className="formlabel">Cliente</Form.Label>
                    <Form.Select
                        name="cliente"
                        className="Custom-input"
                        value={novoEvento.cliente.id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cliente => (
                            <option key={`cliente-${cliente.id}`} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formBasicDateTime" className="mb-3">
                    <Form.Label className="formlabel">Data e Hora</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="dataHora"
                        className="Custom-input"
                        value={novoEvento.dataHora}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicService" className="mb-3">
                    <Form.Label className="formlabel">Tipo de Serviço</Form.Label>
                    <Form.Select
                        name="servico"
                        className="Custom-input"
                        value={novoEvento.servico.idServico}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um serviço</option>
                        {servicos.map(servico => (
                            <option 
                                key={`servico-${servico.idServico}`} 
                                value={servico.idServico}
                            >
                                {servico.nome} - R$ {servico.valor.toFixed(2)} - {servico.duracao}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button
                    variant="primary"
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    style={{ marginTop: '10px', float: 'right' }}
                >
                    {expanded ? <i className="bi bi-chevron-double-up"></i> : <i className="bi bi-chevron-double-down"></i>}
                </Button>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button
                        variant="success"
                        type="submit"
                        className="save"
                        disabled={!novoEvento.cliente.id || !novoEvento.servico.idServico || !novoEvento.dataHora}
                    >
                        Salvar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Adicionar;