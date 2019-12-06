import React, { useState, useEffect } from 'react';
import Logo from '../../assets/img/logo-puc.png';
import { USER_LOGIN_CLIENT} from '../../mutation/Beaware';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import Switch from 'react-bootstrap-switch';
import classnames from 'classnames';

// reactstrap components
import { FormGroup,
  Label, Button, Card, Form, Input, Container, Row, Col, Spinner, Toast, ToastHeader, ToastBody  } from "reactstrap";

const Login = (props) => {  

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    const token = localStorage.getItem('token');
      if(token){
        props.history.push('/beaware');
      }     
  });

  const remember = localStorage.getItem('remember');
  const nombreCompleto =  localStorage.getItem('nombre') + ' ' +  localStorage.getItem('apellido');

  const initialState = {
      company: '',
      user: '',
      pass: '',
      email: '',
      rememberMe: ''
  };

  const [login, addLogin] = useState(initialState)
  const [spinner, addSpinner] = useState(false)
  const [showToastr, setShowToastr] = useState(false);
  const [empty, setEmpty] = useState(false);
  const toggle = () => setShowToastr(!showToastr);

  // Función que actualizará el State
  const updateStateLogin = e => {
    addLogin({
        ...login,
        [e.target.name] : e.target.value
    });
  }

  const [loginUserClient, { dataClient, errorClient }] = useMutation(USER_LOGIN_CLIENT,{
    onCompleted(dataClient) {
      console.log(login);
        if(dataClient.loginClient.contacto){
          let buffKey = new Buffer(dataClient.loginClient.contacto.pass);
          let base64Key = buffKey.toString('base64');
          let buffToken = new Buffer(login.company + "/" + login.email + new Date().getHours() );
          let base64Token = buffToken.toString('base64');
          localStorage.setItem('type', 'client');
          localStorage.setItem('nombre',dataClient.loginClient.contacto.nombre);
          localStorage.setItem('apellido',dataClient.loginClient.contacto.apellido);
          localStorage.setItem('id',dataClient.loginClient.contacto.id);
          if(remember === 'on'){
            localStorage.getItem('email');
            localStorage.setItem('username', "servicedesk/" + localStorage.getItem('email'));
          }else{
            localStorage.setItem('email',login.email);
            localStorage.setItem('username', "servicedesk/" + login.email);
            localStorage.setItem('remember', login.rememberMe);
          }
          localStorage.setItem('key',base64Key);
          localStorage.setItem('token',base64Token);      
          
          addLogin({
              ...login
          });
          setTimeout(() => {
              props.history.push('/beaware');
          }, 500);
        }else{
          setShowToastr(!showToastr)
          setTimeout(() => {
            setShowToastr(false)
          }, 6000);
          addSpinner(false)
        }
      }
    }
  );
  
    // Función encargada de guardar los tickets con el uso de apollo/react-hooks
    const accessLogin = e =>{
      if(login.email.length === 0 || login.pass.length === 0){
        setEmpty(!showToastr)
      }
      addSpinner(true)
      e.preventDefault();
      if(remember != 'on'){
        const loginClient = {
          company: 'servicedesk',
          email: login.email,
          pass: login.pass
        }
        loginUserClient({ variables: { input: loginClient } }); 
      }else{
        const loginClient = {
          company: 'servicedesk',
          email: localStorage.getItem('email'),
          pass: login.pass
        }
        loginUserClient({ variables: { input: loginClient } }); 
      }
      // Llamamos el mutation creado y asignamos al input el objeto que contiene los inputs del
    }
  if(remember != 'on'){
    return (
          <>
        <div
          className="page-header"
          style={{
            backgroundImage: "url(" + require("assets/img/bg-initial.png") + ")"
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
                  <img src={Logo} alt="Punto Único de Contacto" className="title mx-auto my-0" style={{width: "110px"}} />
                  <div>
                    <Row>
                      <Col sm="12">
                        <Form className="register-form"  onSubmit={accessLogin}>
                          <FormGroup className={(empty) ? 'has-danger' : ''}>
                            <label className="text-dark">Correo</label>
                            <Input
                              placeholder= {(empty) ? 'El campo no puede ser vacío' : 'Ingrese el correo'}
                              id="email"
                              name="email"
                              type="text"
                              autoComplete="off"
                              onChange = {updateStateLogin}
                              value={login.email}
                            />
                          </FormGroup>
                          <FormGroup className={(empty) ? 'has-danger' : ''}>
                            <label className="text-dark">Contraseña</label>
                            <Input
                              placeholder= {(empty) ? 'El campo no puede ser vacío' : 'Ingrese su contraseña'}
                              id="pass"
                              name="pass"
                              type="password" 
                              onChange = {updateStateLogin}
                              value={login.pass}
                              />
                          </FormGroup>
                          <FormGroup check>
                            <Label check className="text-dark">
                              <Input 
                              name= "rememberMe"
                              type="checkbox"
                              onChange = {updateStateLogin} 
                              
                              />{' '} Recordar Sesión
                              <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                          </FormGroup>
                          <Button type="submit" block className="btn-round" color="success">
                            {(spinner) ? <Spinner color="light" /> : 'Ingresar'}
                          </Button>                  
                        </Form>
                      </Col>
                    </Row>
                  </div>
                  <div className="forgot">
                    <Button
                      className="btn-link mt-0"
                      color="secondary"
                      href="https://servicedesk.deskbeaware.com/recuperarpass"
                    >
                      Recuperar Contraseña
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <Toast isOpen={showToastr}
              style= {{
                position: 'absolute',
                zIndex: '1000',
                top: '14px',
                right: '24px'
              }}
            >
              <ToastHeader toggle={toggle} className="bg-danger text-white">
                Notificación
              </ToastHeader>
              <ToastBody>
              <i className="nc-icon nc-alert-circle-i text-danger mr-3"></i>  Se ha producido un error. Verifique las credenciales de accesos
              </ToastBody>
            </Toast>
          </Container>
        </div>
      </>
      );
  }else{
    return (
      <>
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/bg-initial.png") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
                <img src={Logo} alt="Punto Único de Contacto" className="title mx-auto my-0" style={{width: "110px"}} />
                <div>
                  <Row>
                    <Col sm="12">
                      <Form className="register-form"  onSubmit={accessLogin}>
                        <h6 className="mt-4 text-dark text-center">
                          <p className="text-secondary"><strong>Bienvenido nuevamente</strong></p> 
                          <p className="text-success"><strong>{nombreCompleto}</strong></p>
                        </h6>
                        <FormGroup className={(empty) ? 'has-danger' : ''}>
                          <label className="text-dark">Contraseña</label>
                          <Input
                            placeholder= {(empty) ? 'El campo no puede ser vacío' : 'Ingrese su contraseña'}
                            id="pass"
                            name="pass"
                            type="password" 
                            onChange = {updateStateLogin}
                            value={login.pass}
                            />
                        </FormGroup>
                        <Button type="submit" block className="btn-round" color="success">
                          {(spinner) ? <Spinner color="light" /> : 'Ingresar'}
                        </Button>                  
                      </Form>
                    </Col>
                  </Row>
                </div>
                <div className="forgot">
                  <Button
                    className="btn-link mt-0"
                    color="secondary"
                    href="https://servicedesk.deskbeaware.com/recuperarpass"
                  >
                  Recuperar Contraseña
                  </Button>
                    <Button 
                    className="btn btn-warning mt-0" 
                    size="sm" 
                    style={{ fontSize: "10px" }} 
                    onClick={() => { localStorage.clear();  
                      setTimeout(() => {
                      props.history.push('/beaware/login');
                    }, 500); }}>Limpiar Sesión</Button>
                </div>
              </Card>
            </Col>
          </Row>
          <Toast isOpen={showToastr}
            style= {{
              position: 'absolute',
              zIndex: '1000',
              top: '14px',
              right: '24px'
            }}
          >
            <ToastHeader toggle={toggle} className="bg-danger text-white">
              Notificación
            </ToastHeader>
            <ToastBody>
            <i className="nc-icon nc-alert-circle-i text-danger mr-3"></i>  Se ha producido un error. Verifique las credenciales de accesos
            </ToastBody>
          </Toast>
        </Container>
      </div>
    </>
    )
  }
};

export default withRouter(Login);