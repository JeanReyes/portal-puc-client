import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_SUB_MOTIVOS } from '../../queries/BeAware';
import {
  Button,
  Spinner } from 'reactstrap';

import SelectedTyping from './SelectedTyping';
import InputDetails from './InputDetails';

const SubMotivos = (props) => {
    // console.log('props', props);
    
    const [showInput, setShowInput] = useState(false)
    const [getSubMotivos, setGetSubMotivos] = useState(false);
    const [idSubMotivos, setIdSubMotivos] = useState(0);    

    const [showSelected, setShowSelected] = useState(false)

    const selected = props.selected;

    const { data, loading, error } = useQuery(GET_SUB_MOTIVOS, {variables: { input: props.parametersCasos }});

    // console.log('data', data)
    if (loading) return (
        <div className="mt-2">
            <Spinner type="grow" size="sm" color="primary" /> Cargando...
        </div>
    );

    const handleClickSubject = (event, subMotivos) => {
        localStorage.setItem("subMotivos", JSON.stringify(subMotivos));
        
        setIdSubMotivos(subMotivos.id)      
        setSubMotivoState(true);
        setShowSelected(true)
        setShowInput(true)
      }

      const setSubMotivoState = (value) => {
        setGetSubMotivos(value);
      }

      
      if (error) return `Error! ${error.message}`;
      const subMotivosList = data.getSubMotivos.map((subMotivos) =>
      <Button 
      className = "m-1"
      color="secondary"
      key={subMotivos.id}
      onClick={(e) => {
            handleClickSubject(e, subMotivos)
        }}
          >
              {subMotivos.nombres }
          </Button>
      );
      
    
    return(
        <Fragment>
                {
                    (showInput) ? <InputDetails setSubMotivoState={setSubMotivoState} /> : 
                    <div> <p className="h4 my-3"> Seleccione el Sub Motivo </p>
                        <div className="border p-3">
                            {subMotivosList}
                        </div>
                        <h4 className="mb-3">Su selección: </h4>
                        <hr />
                    </div>
                }
                {
                
                    (showSelected) ? <SelectedTyping subMotivos={JSON.parse(localStorage.getItem('subMotivos'))} setSubMotivoState={setSubMotivoState} /> : ''
                }
      </Fragment>
      )
};

export default SubMotivos;