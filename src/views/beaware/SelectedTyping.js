import React, { Fragment, useState, useEffect   } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS, GET_MOTIVOS } from '../../queries/BeAware';
import {
    Button,
    Spinner,
    UncontrolledTooltip } from 'reactstrap';
import Motivos from './Motivos';
import { isSelectionNode } from 'graphql';

const SelectedTyping = (props) => {
    const selected = props;
    const [showSelected, setShowSelected] = useState(true)

    const Typing = () => {
        if(showSelected){
            return (
                <Fragment>
                    
                    {/* Pinta el producto Seleccionado */}
                    {
                        (selected.product) ? 
                        <Button
                        size="sm"
                        className = "m-1"
                        color="primary"
                        key={selected.product.id}
                        onClick={() => {
                            props.setMotivoState(false)
                            }}
                        >
                        {selected.product.nombre }
                        </Button> :
                        ''
                    }
                    {
                        (selected.motivos) ? 
                        <Button
                        size="sm"
                        className = "m-1"
                        color="warning"
                        key={selected.motivos.id}
                        onClick={(e) => {
                            props.setSubMotivoState(false)
                            }}
                        >
                        {selected.motivos.nombre }
                        </Button> :
                        ''
                    }
                    {
                        (selected.subMotivos) ? 
                        <Button
                        size="sm"
                        className = "m-1"
                        color="secondary"
                        key={selected.subMotivos.id}
                        onClick={() => {
                            props.setSubMotivoState(false)
                            }}
                        >
                        {selected.subMotivos.nombres }
                        </Button> :
                        ''
                    }
                </Fragment>
            )
        }else{
            return '';
        }
    }

    return (
        <Typing />
    );
};

export default SelectedTyping;