import React,{useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'

const EventModal = ({evento, onClose, onDelete, onUpdate}) =>{
    const [editedEvent, setEditedEvent] = useState({...evento});

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setEditedEvent({...editedEvent, [name]:value});
    }


    const handleStartDateChange = (e)=>{
        const startDate = new Date(e.target.value);
        if(startDate <= editedEvent.end){
            setEditedEvent({...editedEvent, start:startDate});
        }
    }

    const handleEndDateChange = (e)=>{
        const endDate = new Date(e.target.value);
        if(endDate >= editedEvent.start){
            setEditedEvent({...editedEvent, end:endDate});
        }
    }
    const handleDelete = () =>{
        onDelete(evento.id);
    }
    const handleUpdate = () =>{
        onUpdate(editedEvent);
        onClose();
    }

    const adjustDate = (date) =>{
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0,-8);
    };


    return(
        <Modal className="modal" show={true} onHide={onClose}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <Modal.Header>
                        <Modal.Title>{editedEvent.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label className="formlabel">Cliente</Form.Label>
                                <Form.Control type="text" name='cliente' value={editedEvent.cliente} onChange={handleInputChange}/>
                            </Form.Group>

                                <div>
                                <Form.Group controlId="formInicio">
                                    <Form.Label className="formlabel">Início</Form.Label>
                                    <Form.Control type="datetime-local" name='start' value={adjustDate(editedEvent.start)} onChange={handleStartDateChange}/>
                                </Form.Group>
                                
                                <Form.Group controlId="formEnd">
                                    <Form.Label className="formlabel">Fim</Form.Label>
                                    <Form.Control type="datetime-local" name='end' value={adjustDate(editedEvent.end)} onChange={handleEndDateChange}/>
                                </Form.Group>

                                <Form.Group controlId="formTipo">
                                    <Form.Label className="formlabel">Tipo</Form.Label>
                                    <Form.Control type="text" name='tipo' value={editedEvent.tipo} onChange={handleInputChange}/>
                                </Form.Group>
                                </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className='justify-content-between'>
                        <Button className="save" onClick={handleDelete} style={{ margin: '10px' }}>
                            Cancelar Agendamento
                        </Button>
                        <Button className="save" onClick={handleUpdate} style={{ margin: '10px' }}>
                            Salvar Alterações
                        </Button>
                    </Modal.Footer>
                </div>
            </div>
        </Modal>
    )
}

export default EventModal;