import React, { useEffect, useState } from 'react';
import {Form} from 'react-bootstrap'

function FiltroAtividades({atividades,onSelecionarAtividades}){
    const tiposAtividades = [... new Set(atividades.map(atividade => atividade.tipo))].filter(tipo=> tipo!== '');

    const [tiposSelecionados, setTiposSelecionados] = useState([]);

    const toggleTipo = (tipo) =>{
        if(tiposSelecionados.includes(tipo)){
            setTiposSelecionados(tiposSelecionados.filter(t => t !== tipo));
        } else {
            setTiposSelecionados([...tiposSelecionados, tipo]);
        }
    };

    useEffect(() => {
        if(tiposSelecionados.length === 0 ){
            onSelecionarAtividades(atividades);
        } else {
            const eventosFiltrados = atividades.filter(atividade => tiposSelecionados.includes(atividade.tipo));
            onSelecionarAtividades(eventosFiltrados);
        }
    },[tiposSelecionados, atividades,onSelecionarAtividades]);

    return(
        tiposAtividades.length > 0&&(
            <div className="formcontainer">
                <div className="formlabel" style={{maxHeight:'28vh', overflowY: 'auto'}}>
                    {tiposAtividades.map(tipo =>(
                            <Form.Check
                            key={tipo}
                            label={tipo}
                            checked={tiposSelecionados.includes(tipo)}
                            onChange={() => toggleTipo(tipo)}
                            className='mr-3 mb-3'/>
                    ))}
                </div>
                <button className="save" onClick={()=> setTiposSelecionados([])}>Limpar Filtro</button>
            </div>
        )

    )
}

export default FiltroAtividades;