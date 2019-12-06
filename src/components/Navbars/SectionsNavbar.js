import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import Logo from '../../assets/img/logo-puc.png';
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

function SectionsNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-light");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-light");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames(navbarColor)} expand="lg">
      <Container>
        <div className="navbar-light">
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
                <i className="nc-icon nc-badge" /> ¿Que es el PUC?
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/case"
              >
                <i className="nc-icon nc-badge" /> Ingresa tu Caso
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/#contact"
              >
                <i className="nc-icon nc-chat-33" /> Contacto
              </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="#!"
                >
                    <i className="nc-icon nc-shop" />
                    Portal de Seguimiento
                </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default SectionsNavbar;
