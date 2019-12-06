import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/bg-initial.png") + ")"
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h2 className="presentation-title">Punto Único de Contacto</h2>
            </div>
            <h2 className="presentation-subtitle text-center">
              Unidad funcional que atiende las Solicitudes de Servicios de los usuarios.
            </h2>
          </Container>
        </div>
        <h6 className="category category-absolute">
        Tecnología
          <a
            href="https://www.beaware360.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="..."
              className="mx-3"
              style={{width: '100px', filter: 'brightness(4)'}}
              src={require("assets/img/logo-beaware-4.png")}
            />
          </a>
        </h6>
      </div>
    </>
  );
}

export default IndexHeader;
