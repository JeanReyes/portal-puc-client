import React, { Fragment,useState } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Nav, 
    NavItem, 
    NavLink, 
    Button,
    Modal,
    Spinner } from 'reactstrap';

const Logout = (props) => {

    const [activeModalSession, setActiveModalSession] = useState(false);
    const [spinner, addSpinner] = useState(false)

    const logoutSession = e => {
        e.preventDefault();
        addSpinner(true)
        localStorage.removeItem('token');
        setTimeout(() => {
            props.history.push('/beaware/login');
        }, 3000);
    }
 
    return (
        <Fragment>
            <Nav className="ml-auto" navbar>
                <NavItem className="mx-3">
                    <NavLink 
                    href="#"
                    className="btn-link text-white" 
                    onClick={() => setActiveModalSession(true)} >
                        <i className="nc-icon nc-button-power mr-2"></i> Cerrar Sesión
                    </NavLink >
                </NavItem>         
            </Nav>
            <Modal
                isOpen={activeModalSession}
                className="modal-sm"
                modalClassName="bd-example-modal-sm"
                toggle={() => setActiveModalSession(false)}
            >
                <div className="modal-header bg-secondary text-white">
                <h4 className="modal-title" id="mySmallModalLabel">
                    Cerrar Sesión
                </h4>
                </div>
                <div className="modal-body">
                    <p>¿Desea cerrar sesión?</p>
                </div>
                <div className="modal-footer">
                    <div className="left-side">
                        <Button
                        className="btn-link"
                        color="default"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setActiveModalSession(false)}
                        >
                        Cancelar
                        </Button>
                    </div>
                    <div className="divider" />
                    <div className="right-side">
                        <Button
                        className="btn-link"
                        color="danger"
                        type="button"
                        onClick={logoutSession}
                        >
                        { (spinner) ? <Spinner color="danger" /> : 'Cerrar Sesión' }
                        </Button>
                    </div>
                    </div>
            </Modal>
        </Fragment>
    );
};

export default withRouter(Logout);