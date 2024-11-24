import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';
import axios from 'axios'; // Não esqueça de instalar o axios

function Adicionar({ onAdicionar }) {
    const [novoEvento, setNovoEvento] = useState({
        cliente: {
            id: '', // Você precisará de um select para escolher o cliente
            nome: ''
        },
        servico: {
            id: '', // Você precisará de um select para escolher o serviço
            nome: ''
        },
        dataHora: '',
    });
    const [expanded, setExpanded] = useState(false);
    const [clientes, setClientes] = useState([]); // Lista de clientes
    const [servicos, setServicos] = useState([]); // Lista de serviços

    // Carregar clientes e serviços quando o componente montar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesResponse, servicosResponse] = await Promise.all([
                    axios.get('http://localhost:8080/clientes'),
                    axios.get('http://localhost:8080/servicos')
                ]);
                setClientes(clientesResponse.data);
                setServicos(servicosResponse.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
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
                cliente: {
                    id: selectedClient.id,
                    nome: selectedClient.nome
                }
            }));
        } else if (name === 'servico') {
            const selectedService = servicos.find(s => s.id === parseInt(value));
            setNovoEvento(prev => ({
                ...prev,
                servico: {
                    id: selectedService.id,
                    nome: selectedService.nome
                }
            }));
        } else if (name === 'dataHora') {
            setNovoEvento(prev => ({
                ...prev,
                dataHora: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Formatando os dados para enviar ao backend
            const agendamentoData = {
                id_cliente: novoEvento.cliente.id,
                id_servico: novoEvento.servico.id,
                dataHora: novoEvento.dataHora
            };

            const response = await axios.post('http://localhost:8080/agendamento', agendamentoData);
            
            // Convertendo a resposta para o formato do Big Calendar
            const eventoCalendario = {
                title: `${novoEvento.cliente.nome} - ${novoEvento.servico.nome}`,
                start: new Date(novoEvento.dataHora),
                end: new Date(new Date(novoEvento.dataHora).getTime() + 60*60*1000), // Adiciona 1 hora
                resource: response.data
            };

            onAdicionar(eventoCalendario);
            
            // Limpar o formulário
            setNovoEvento({
                cliente: { id: '', nome: '' },
                servico: { id: '', nome: '' },
                dataHora: ''
            });
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            alert('Erro ao salvar o agendamento. Por favor, tente novamente.');
        }
    };

    return (
        <div className="formfilter">
            <h3 className="title-h3">Adicionar Agendamento</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicClient'>
                    <Form.Label className="formlabel">Cliente</Form.Label>
                    <Form.Select 
                        name="cliente"
                        className="Custom-input"
                        value={novoEvento.cliente.id}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formBasicDateTime">
                    <Form.Label className="formlabel">Data e Hora</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="dataHora"
                        className="Custom-input"
                        value={novoEvento.dataHora}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Collapse in={expanded}>
                    <div>
                        <Form.Group controlId='formBasicService'>
                            <Form.Label className="formlabel">Tipo de Serviço</Form.Label>
                            <Form.Select
                                name="servico"
                                className="Custom-input"
                                value={novoEvento.servico.id}
                                onChange={handleChange}
                            >
                                <option value="">Selecione um serviço</option>
                                {servicos.map(servico => (
                                    <option key={servico.id} value={servico.id}>
                                        {servico.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>
                </Collapse>

                <Button
                    variant='primary'
                    type='button'
                    onClick={() => setExpanded(!expanded)}
                    style={{marginTop: '10px', float:'right'}}>
                    {expanded ? <i className="bi bi-chevron-double-up"></i> : <i className="bi bi-chevron-double-down"></i>}
                </Button>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button
                        variant='success'
                        type='submit'
                        className="save"
                        disabled={!novoEvento.title || !novoEvento.start|| !novoEvento.end}
                    >
                        Salvar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Adicionar;