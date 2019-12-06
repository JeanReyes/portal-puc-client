import React, { Fragment, useState, useEffect   } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";
import { GET_PRODUCTS, GET_MOTIVOS } from '../../queries/BeAware';
import SectionPageHeader from 'components/Headers/SectionPageHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { withRouter } from 'react-router-dom';
import {Animated} from 'react-animated-css';
import VerCasos from './VerCasos';

import {  
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    UncontrolledTooltip,
    Container,
    Spinner,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';


const MensajeBeawere = (props) => {

    const [showCasos, setShowCasos] = useState(false)


useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    const token = localStorage.getItem('token');
    if(!token){
        props.history.push('/beaware/login');
    }
});

const volver = e => {
   
     props.history.push('/');
   
}

const verCasos = e => {
   
    setShowCasos(true)
  
}

    return (
        <Fragment>
            {
            (showCasos) ?  <VerCasos/> :
                <Animated animationIn="fadeIn"  animationOut="fadeOut" isVisible={true}>
                    <Card className="text-center">
                        <CardHeader>
                        
                        </CardHeader>
                        <CardBody>
                            <CardTitle>
                                <h2>El caso se ha creado con éxito</h2>
                                id del caso: {props.idCaso}
                            </CardTitle>
                            <hr/>
                            <Button active onClick={volver} color="primary">Nuevo caso</Button>{" "}
                            <Button active onClick={verCasos} color="primary">Ver casos</Button>
                        </CardBody>
                    </Card>
                </Animated>
            }
        </Fragment>
    );
};

export default withRouter(MensajeBeawere);