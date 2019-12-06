import React, { Fragment, useState, useEffect   } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";
import { GET_PRODUCTS, GET_MOTIVOS } from '../../queries/BeAware';
import SectionPageHeader from 'components/Headers/SectionPageHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { withRouter } from 'react-router-dom';
import {  
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    UncontrolledTooltip,
    Container } from 'reactstrap';

import NavBarMenu from './NavBarMenu';
import Products from './Products';


const IndexBeaware = (props) => {

const parametersCasos = {
    key: localStorage.getItem('key'),
    token: localStorage.getItem('token'),
    type: localStorage.getItem('type'),
    username: localStorage.getItem('username')
}


useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    const token = localStorage.getItem('token');
    if(!token){
        props.history.push('/beaware/login');
    }
});

    return (
        <Fragment>
            <IndexNavbar />
            <SectionPageHeader />
            <NavBarMenu />
            <Breadcrumb>
                <BreadcrumbItem><a href="/beaware">Home</a></BreadcrumbItem>
                <BreadcrumbItem active>Beaware</BreadcrumbItem>
            </Breadcrumb>
            <Container style={{ minHeight:" 350px", display:"block" }} >
                <p className="h2 my-3" id="titulo">Crear Casos</p>
                <hr />
                <Products className="mb-5" />
            </Container>

          
        </Fragment>
    );
};

export default withRouter(IndexBeaware);