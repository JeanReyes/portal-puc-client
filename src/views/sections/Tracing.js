import React, { Fragment } from 'react';
import ImgBgPortal from "assets/img/bg-portal.png";

const Tracing = () => {
    return (
        <Fragment>
            <section id="portal" className="projects-section bg-light">
                <div className="container">
                    {/* Featured Project Row */}
                    <div className="row align-items-center no-gutters mb-4 mb-lg-5">
                        <div className="col-xl-8 col-lg-7">
                            <img className="img-fluid mb-3 mb-lg-0" src={ImgBgPortal} alt="Portal BeAware360" />
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="featured-text text-center text-lg-left">
                            <h4>Seguimiento de tus casos</h4>
                            <p className="text-black-50 mb-0">Accede con tus credenciales al <b>portal de seguimiento</b> y así podrás ver el detalle de los mismos.</p>
                            <p className="mt-5"><a href="https://servicedesk.portalbeaware.com/login" target="_blank" rel="noopener noreferrer" className="btn btn-primary"> Portal de seguimiento</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Fragment>
    );
};

export default Tracing;