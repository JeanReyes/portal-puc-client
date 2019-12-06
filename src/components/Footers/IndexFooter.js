import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";


const IndexFooter = () => {
    return (
    <footer className="footer bg-dark">
      <Container>
        <Row>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, hecho con {" "}
              <i className="fa fa-heart heart" /> by In Motion / CXE
            </span>
          </div>
        </Row>
      </Container>
    </footer>
    );
};

export default IndexFooter;