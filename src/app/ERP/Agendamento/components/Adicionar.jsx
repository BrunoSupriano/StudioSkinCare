import React, {useState} from 'react';
import {Button, Form, Row, Col, Collapse} from 'react-bootstrap';

function Adicionar({onAdicionar}){
    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '',
        end: '',
        tipo: '',
    });
    const [expanded, setExpanded] = useState(false);

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setNovoEvento({...novoEvento, [name]:value});
    }

    const handleToggleExpanded = (e) =>{
        e.stopPropagation();
        setExpanded(!expanded)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(novoEvento.title && novoEvento.start && novoEvento.end){
            const startDate = new Date(novoEvento.start);
            const endDate = new Date(novoEvento.end);

            if(startDate >= endDate){
                alert('A data início deve ser anterior à data de término');
                return;
            }
            onAdicionar(novoEvento);
            setNovoEvento({
                title: '',
                start: '',
                end: '',
                tipo: '',
            })
        }

    }


    return(
        <div className="formcontainer">
            <h3 className="title-h3">Adicionar Evento</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicTitle'>
                    <Form.Label className="formlabel">Cliente</Form.Label>
                    <Form.Control type="text" placeholder="Nome do cliente" name="title" className="Custom-input" value={novoEvento.title} onChange={handleChange}/>
                </Form.Group>
                <Row>
                    <Col xs={6}>
                        <Form.Group controlId="formBasicStart">
                            <Form.Label className="formlabel">Início</Form.Label>
                            <Form.Control type="datetime-local" name="start" className="Custom-input" value={novoEvento.start} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group controlId="formBasicEnd">
                            <Form.Label className="formlabel">Término</Form.Label>
                            <Form.Control type="datetime-local" name="end" className="Custom-input" value={novoEvento.end} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Collapse in={expanded}>
                    <div>
                        <div>
                            <Form.Group controlId='formBasicDesc'>
                                <Form.Label className="formlabel">Tipo de Serviço</Form.Label>
                                <Form.Control type='text' placeholder='Selecione o tipo de serviço' name='tipo' className="Custom-input" value={novoEvento.tipo} onChange={handleChange}/>
                            </Form.Group>
                        </div>
                    </div>
                </Collapse>
                <Button
                    variant='primary'
                    type='button'
                    onClick={handleToggleExpanded}
                    style={{marginTop: '10px', float:'right'}}>
                        {expanded ? <i class="bi bi-chevron-double-up"></i>:<i class="bi bi-chevron-double-down"></i>}
                </Button>
                <div>
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
    )
}

export default Adicionar;