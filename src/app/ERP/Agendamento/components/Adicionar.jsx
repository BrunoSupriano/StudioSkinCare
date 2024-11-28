import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

function Adicionar({ onAdicionar }) {
    const [novoEvento, setNovoEvento] = useState({
        cliente: {
            id: '',
            nome: ''
        },
        servicos: [], // Alterado para um array de serviços
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

            if (selectedService) {
                setNovoEvento(prev => {
                    const updatedServicos = prev.servicos.some(s => s.idServico === selectedService.idServico)
                        ? prev.servicos
                        : [...prev.servicos, selectedService];
                    return { ...prev, servicos: updatedServicos };
                });
            }
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

    // Função para remover serviço da lista de serviços selecionados
    const removerServico = (idServico) => {
        setNovoEvento(prev => ({
            ...prev,
            servicos: prev.servicos.filter(s => s.idServico !== idServico)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataInicial = new Date(novoEvento.dataHora);

            const agendamentos = novoEvento.servicos.map(servico => {
                const dataFinal = calcularDataFinal(dataInicial, servico.duracao);

                return {
                    id_cliente: parseInt(novoEvento.cliente.id),
                    id_servico: parseInt(servico.idServico),
                    dataInicial: formatarData(dataInicial),
                    dataFinal: formatarData(dataFinal),
                    status: 1
                };
            });

            console.log('Dados de agendamento a serem enviados:', agendamentos);

            const response = await fetch('http://localhost:8080/agendamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendamentos),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao salvar agendamento');
            }

            const responseData = await response.json();

            const eventoCalendario = agendamentos.map(agendamento => ({
                title: `${novoEvento.cliente.nome} - ${servicos.find(s => s.idServico === agendamento.id_servico).nome}`,
                start: new Date(agendamento.dataInicial),
                end: new Date(agendamento.dataFinal),
                resource: responseData,
            }));

            eventoCalendario.forEach(evento => onAdicionar(evento));

            // Reset form
            setNovoEvento({
                cliente: { id: '', nome: '' },
                servicos: [],
                dataHora: ''
            });

            alert('Agendamentos salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar agendamentos:', error);
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
                        value={novoEvento.servicos.map(s => s.idServico)}
                        onChange={handleChange}
                        multiple
                        required
                    >
                        <option value="">Selecione os serviços</option>
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

                <Form.Group controlId="formSelectedServices" className="mb-3">
                    <Form.Label className="formlabel">Serviços Selecionados</Form.Label>
                    <ul>
                        {novoEvento.servicos.map((servico, index) => (
                            <li key={`servico-${index}`}>
                                {servico.nome} - R$ {servico.valor.toFixed(2)} - {servico.duracao}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => removerServico(servico.idServico)}
                                >
                                    Remover
                                </Button>
                            </li>
                        ))}
                    </ul>
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
                        disabled={!novoEvento.cliente.id || novoEvento.servicos.length === 0 || !novoEvento.dataHora}
                    >
                        Salvar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Adicionar;
