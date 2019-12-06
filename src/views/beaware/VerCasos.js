import React, { Fragment, useState, useEffect   } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_CASOS_BY_CLIENT } from 'queries/BeAware';
import {  
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Badge,
    Container,
    UncontrolledTooltip,
    Spinner,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

import Pagination from './Pagination';

import {Animated} from 'react-animated-css';

const VerCasos = () => {

    useEffect(() => {
        localStorage.removeItem('selected');
    });
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(5); //casos por pagina
    
    const parametersCasos = {
        key: localStorage.getItem('key'),
        token: localStorage.getItem('token'),
        type: localStorage.getItem('type'),
        username: localStorage.getItem('username')
    }

    const { data, loading, error } = useQuery(GET_CASOS_BY_CLIENT, {variables: { input: parametersCasos }});
        if (loading) return (
            <div className="mt-2">
                <Spinner type="grow" size="sm" color="primary" /> Cargando...
            </div>
        );

    //variables para config de la paginación.

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const indexOfLasPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLasPost - postPerPage;
    const currentPosts = data.getAllCasosByClient.slice(indexOfFirstPost, indexOfLasPost);
    
    //cambio de pagina de los casos

    if (error) return `Error! ${error.message}`;
    const CasosLis = currentPosts.map((casos) =>
        <tr>
            <td>{casos.id}</td>
            <td>{casos.refnum}</td>
            <td>{casos.asunto}</td>
            <td>Tipo</td>
            <td>{casos.fechacreacion}</td>
            <td><Badge href="#" color="success">Ver</Badge></td>
        </tr>
    );
    return(
        <Fragment>
            <Container style={{ minHeight:" 10px", display:"block" }} >
                <p className="h2 my-3" id="titulo">Mis Casos</p>   
            </Container>
                <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Numero</th>
                        <th scope="col">Asunto</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Fecha creación</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {CasosLis}
                </tbody>
                </table>  
               
                    <Pagination postPerPgae={postPerPage} totalPosts={data.getAllCasosByClient.length} paginate={paginate} />
               
        </Fragment>
    )
};

export default VerCasos;