import React, { Fragment, useState, useEffect   } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS, GET_MOTIVOS } from 'queries/BeAware';
import {
    Button,
    Spinner,
    UncontrolledTooltip } from 'reactstrap';
import Motivos from './Motivos';
import SelectedTyping from './SelectedTyping';

import {Animated} from 'react-animated-css';

const Products = () => {

    useEffect(() => {
        localStorage.removeItem('selected');
    })

    const [getMotivos, setGetMotivos] = useState(false);
    const [idMotivos, setIdMotivos] = useState(0);

    const [showSelected, setShowSelected] = useState(false)
    const [showProducts, setShowProducts] = useState(false)
    const [showMotivos, setShowMotivos] = useState(false)
    const [showSubMotivos, setShowSubMotivos] = useState(false)

    const selected = {};
    
    const parametersCasos = {
        key: localStorage.getItem('key'),
        token: localStorage.getItem('token'),
        type: localStorage.getItem('type'),
        username: localStorage.getItem('username')
    }

    const { data, loading, error } = useQuery(GET_PRODUCTS, {variables: { input: parametersCasos }});
        if (loading) return (
            <div className="mt-2">
                <Spinner type="grow" size="sm" color="primary" /> Cargando...
            </div>
        );

    const handleClickMotivos = (event, product) => {
        localStorage.setItem("product", JSON.stringify(product));
        setIdMotivos(product.id)
        setShowSelected(true)
        setMotivoState(true)
    }
    
    
    const setMotivoState = (value) => {
        setGetMotivos(value);
      }

    const MotivosList = () => {
        if(getMotivos && idMotivos !== 0){
            parametersCasos.id = idMotivos;
            return <Motivos parametersCasos = {parametersCasos} selected = {JSON.parse(localStorage.getItem('selected'))} />
        }else{
            return null;
        }
    };

    if (error) return `Error! ${error.message}`;
    const productLis = data.getProducts.map((product) =>
        <Button 
        className = "m-1"
        color="primary" 
        key={product.id}
        onClick={(e) => {
            handleClickMotivos(e, product)
            }}
        >
            {product.nombre}
        </Button>
    );
    return(
        <Fragment>
                {
                    (getMotivos) ? <MotivosList /> : 
                    <div> <p className="h4 my-3"> Seleccione el Producto </p>
                        <div className="border p-3">
                            {productLis}
                        </div>
                        <h4 className="mb-3">Su selección: </h4>
                        <hr />
                    </div>
                }
                {
                    (showSelected) ? 
                    <SelectedTyping product={JSON.parse(localStorage.getItem('product'))} setMotivoState={setMotivoState} /> : "No ha seleccionado aún su tipificación de consulta."
                }
        </Fragment>
    )
};

export default Products;