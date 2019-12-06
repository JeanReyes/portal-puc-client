import React from 'react';

const Contact = () => {
    return (
    <section id="contact" className="contact-section">
        <div className="container">
            <div className="row">
                <div className="col-md-4 mb-3 mb-md-0">
                    <div className="card py-4 h-100">
                        <div className="card-body text-center">
                            <i className="nc-icon nc-time-alarm text-primary mb-3" style={{ fontSize: "2rem" }}/>
                            <h4 className="text-uppercase m-0">Horarios </h4>
                            <hr className="my-4" />
                            <div className="text-black-50">7*24 los 365 días del año</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                    <div className="card py-4 h-100">
                        <div className="card-body text-center">
                        <i className="nc-icon nc-email-85 text-primary mb-3" style={{ fontSize: "2rem" }}/>
                            <h4 className="text-uppercase m-0">Email</h4>
                            <hr className="my-4" />
                            <div className="text-black-50">
                            <a href="mailto:puc@grupoinmotion.com" target="_top">puc@grupoinmotion.com </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                    <div className="card py-4 h-100">
                        <div className="card-body text-center">
                            <i className="nc-icon nc-satisfied text-primary mb-3" style={{ fontSize: "2rem" }}/>
                            <h4 className="text-uppercase m-0">Teléfonos</h4>
                            <hr className="my-4" />
                            <div className="text-black-50">+(56 2) 2431 6428 (Chile)</div>
                            <div className="text-black-50">(+57) 1 508 6510 (Colombia)</div>
                            <div className="text-black-50">+(52 55) 8526 1637 (México)</div>
                            <div className="text-black-50">(+54 11)  5237 1204 (Argentina)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    );
};

export default Contact;