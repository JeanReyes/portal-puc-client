import React, { Fragment, useState } from 'react';

import {
  Input,
  FormGroup,
  Form,
  Row,
  Col,
  Spinner,
  Button,Toast,
  ToastHeader,
  ToastBody,
  Label } from 'reactstrap';

import {Animated} from 'react-animated-css';
import { useMutation } from 'react-apollo';
import { ADD_CASES } from 'mutation/Beaware';
import { ADD_NOTES } from 'mutation/Beaware';
import { withRouter } from 'react-router-dom';
import MensajeBeawere from './MensajeBeawere';


const InputDetails = (props) => {
    const product = JSON.parse(localStorage.getItem('product'));
    const motivos = JSON.parse(localStorage.getItem('motivos'));
    const subMotivos = JSON.parse(localStorage.getItem('subMotivos'));
    const initialStateCase = {
        asunto: '',
        idproducto: product.id,
        idtipo: motivos.id,
        idsubtipo: subMotivos.id,
        idcontacto: parseInt(localStorage.getItem('id')),
        key: localStorage.getItem('key'),
        username: localStorage.getItem('username')
    };    
    const [spinner, addSpinner] = useState(false)
    const [cases, addCases] = useState(initialStateCase)
    const [notes, addNotes] = useState({})
    const [showInput, setShowInput] = useState(false)

    const [idcaso, setIdcaso] = useState(0);
    const [showToastr, setShowToastr] = useState(false);

    //campos para validar.
    const [asunto, setAsunto] = useState(false);
    const [ambiente, setAmbiente] = useState(false);
    const [detalle, setDetalle] = useState(false);

    const toggle = () => setShowToastr(!showToastr);

  // Función que actualizará el State
    const updateStateCases = e => {
        setAsunto(false); //si es false el campo es valido
        addCases({
          ...cases,
          [e.target.name] : e.target.value
          
      });
    }
    const updateStateNotes = e => {
        setAmbiente(false);
        setDetalle(false);
        addNotes({
          ...notes,
          [e.target.name] : e.target.value
      });
    }

    console.log(notes)
    const [addCasesMutation, { dataCases, errorCases }] = useMutation(ADD_CASES,{
        onCompleted(addCasesMutation){
            console.log(addCasesMutation.addCases.id);
            if(addCasesMutation.addCases.id){
                setIdcaso(addCasesMutation.addCases.id); //asigno el id del caso 
                const initialStateNotes = {
                    idobjeto: addCasesMutation.addCases.id,
                    texto: `Ambiente del Caso: ${notes.instance}. Detalle de la Consulta: ${notes.details}`,
                    tipoobjeto: 'casos',
                    key: localStorage.getItem('key'),
                    username: localStorage.getItem('username')
                };

                addNoteMutation({ variables: { input: initialStateNotes } })
            }
        }
    });

    const [addNoteMutation, { dataNotes, errorNotes }] = useMutation(ADD_NOTES, {
        onCompleted(addNoteMutation) {
            setShowToastr(true);
            addSpinner(false)
        }
    })

    const saveCase = e => {

        var error = false; //variable para encontrar error
        e.preventDefault();

        var asuntoV = document.querySelector('#asunto'); 
        var instanceV = document.querySelector('#instance'); 
        var detailsV = document.querySelector('#details'); 

        //condiciones para validar antes de guardar
        if(asuntoV.value == null || asuntoV.value == ""){
            error = true;
            setAsunto(true);
        }

        if(instanceV.value == null || instanceV.value == ""){
            error = true;
            setAmbiente(true);
        }
 
        if(detailsV.value == null || detailsV.value == ""){
            error = true;
            setDetalle(true);
            
        }
        if(!error){
            addCasesMutation({ variables: { input: cases } }); //agrega el caso 
            addSpinner(true); //efecto de envio en el boton 
            setShowInput(true); //muestra el componente de mensaje
    
            //tomo el id del titulo.
            var titulo = document.getElementById('titulo');
            titulo.style.display = "none";

        }

    }

    return (
        <>
            {
                (showInput)? <MensajeBeawere idCaso={idcaso} />:
            
                <div id="formulario">
                    <Animated animationIn="fadeIn"  animationOut="fadeOut" isVisible={true}>
                        <Form onSubmit={saveCase}>
                            <Row form>
                                <Col md={6}>
                                <FormGroup  className={ (asunto) ? 'has-danger' : 'has-success'}>
                                    <Label for="asunto">Asunto</Label>
                                    <Input  type="text" name="asunto" id="asunto" placeholder="Ingrese el asunto del caso" onChange={updateStateCases} />
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup className={ (ambiente) ? 'has-danger' : 'has-success'}>
                                    <Label for="instance">Ambiente</Label>
                                    <Input type="select" name="instance" id="instance" onChange={updateStateNotes}>
                                        <option value="">Seleccione...</option>
                                        <option value="Producción">Producción</option>
                                        <option value="Test">Test</option>
                                        <option value="Desarrollo">Desarrollo</option>
                                    </Input>
                                </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup className={ (detalle) ? 'has-danger' : 'has-success'}>
                                        <Label for="details">Detalle del Caso</Label>
                                        <Input type="textarea" name="details" id="details" onChange={updateStateNotes} />
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <Button type="buttom" className="btn-round" color="success">
                                        {(spinner) ? <Spinner color="light" /> : 'Crear Caso'}
                                        
                                    </Button>
                                
                                </Col>
                            </Row>                
                        </Form>
                    </Animated>


                    <h4 className="mb-3">Su selección: </h4>
                </div>
            }

        </>
   
    );

};

export default withRouter(InputDetails);