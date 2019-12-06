import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import Logo from '../../assets/img/logo-puc-png.png';
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 150 ||
        document.body.scrollTop > 150
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/#home"
            title="Punto Único de Contacto"
          >
            <img src={Logo} alt="Punto Único de Contacto" style={{width: "60px"}} />
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div> 
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                href="/#about"
              >
                <i className="nc-icon nc-bulb-63 mr-2" /> ¿Que es el PUC?
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/#portal"
              >
                 <i className="nc-icon nc-shop mr-2" />
                Portal de Seguimiento
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/#contact"
              >
                <i className="nc-icon nc-chat-33 mr-2" /> Contacto
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/beaware"
              >
                <i className="nc-icon nc-tap-01 mr-2" /> Ingresa tu Caso
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
