import React, { Fragment } from 'react';
// reactstrap components
import {
    Container,
    Row,
    Col
  } from "reactstrap"

const About = () => {
    return (
        <Fragment>
            <div className="section text-center" id="about">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" md="8">
                            <h2 className="title">¿Que es el PUC?</h2>
                            <h5 className="description">
                            Es una unidad funcional que atiende las Solicitudes de Servicios de los usuarios y clientes, 
                            las verifica, clasifica, registra y deriva al Ingeniero Resolutor o 
                            Jefe de Proyecto según corresponda para dar respuesta. 
                            El PUC es el organismo de In Motion oficial para generar 
                            los tickets de atención que representan las solicitudes 
                            de nuestros clientes.
                            </h5>
                            <br />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col md="4">
                            <div className="info">
                            <div className="icon icon-info">
                                <i className="nc-icon nc-check-2" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">Verificación</h4>
                                <p className="description">
                                    El PUC verifica que la información de la solicitud se enmarca dentro de los Acuerdos de Servicio.
                                </p>
                            </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="info">
                            <div className="icon icon-info">
                                <i className="nc-icon nc-bulb-63" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">Registro</h4>
                                <p>
                                    Asegura que toda la información recolectada en la etapa de Verificación quede registrada en el ticket.
                                </p>
                            </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="info">
                            <div className="icon icon-info">
                                <i className="nc-icon nc-sun-fog-29" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">Asignación</h4>
                                <p>
                                    El PUC, luego de la Verificación y Registro procederá a la asignación del ticket. 
                                </p>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};

export default About;