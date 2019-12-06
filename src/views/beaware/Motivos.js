import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOTIVOS } from '../../queries/BeAware';
import {
  Button,
  Spinner,
  UncontrolledTooltip } from 'reactstrap';
import SubMotivos from './SubMotivos';
import SelectedTyping from './SelectedTyping';

const Motivos = (props) => {

  const [getSubMotivos, setGetSubMotivos] = useState(false);
  const [idSubMotivos, setIdSubMotivos] = useState(0);    

  const [showSelected, setShowSelected] = useState(false)

  const selected = props.selected;

  const { data, loading, error } = useQuery(GET_MOTIVOS, {variables: { input: props.parametersCasos }});
    if (loading) return (
        <div className="mt-2">
            <Spinner type="grow" size="sm" color="primary" /> Cargando...
        </div>
    );

  const handleClickSubMotivos = (event, motivos) => {
    localStorage.setItem("motivos", JSON.stringify(motivos));
    
    setIdSubMotivos(motivos.id)
    setSubMotivoState(true);
    setShowSelected(true)
  }

  const setSubMotivoState = (value) => {
    setGetSubMotivos(value);
  }

  const SubMotivosList = () => {
    if(getSubMotivos && idSubMotivos !== 0){
      props.parametersCasos.id = idSubMotivos;
      return <SubMotivos parametersCasos = {props.parametersCasos} selected = {JSON.parse(localStorage.getItem('selected'))} />
    }else{
        return null;
    }
};
    if (error) return `Error! ${error.message}`;
      const motivosList = data.getMotivos.map((motivos) =>
          <Button 
          className = "m-1"
          color="warning" 
          key={motivos.id}
          onClick={(e) => {
              handleClickSubMotivos(e, motivos)
              }}
          >
              {motivos.nombre }
          </Button>
      );
     
      return(
        <Fragment>
            {
                (getSubMotivos) ? <SubMotivosList /> : 
                <div> <p className="h4 my-3"> Seleccione el Motivo </p>
                    <div className="border p-3">
                        {motivosList}
                    </div>
                    <h4 className="mb-3">Su selección: </h4>
                    <hr />
                </div>
            }
            {
              (showSelected) ? <SelectedTyping motivos={JSON.parse(localStorage.getItem('motivos'))} setSubMotivoState={setSubMotivoState} /> : ''
            }
      </Fragment>
      )
  }

export default Motivos;