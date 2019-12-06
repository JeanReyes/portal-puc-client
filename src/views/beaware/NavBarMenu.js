import React, { Fragment } from 'react';
import LogoBA from "../../assets/img/logo-beaware-4.png"
import {
    Navbar,
    NavbarBrand } from 'reactstrap';
import Logout from './Logout';

const NavBarMenu = () => {
    return (
        <Fragment>
            <Navbar color="primary" light expand="md">
                <NavbarBrand href="/">
                    <img src={LogoBA} alt="BeAware360" style={{ width: "100px" }} />
                </NavbarBrand>
                <Logout />
            </Navbar>
        </Fragment>
    );
};

export default NavBarMenu;