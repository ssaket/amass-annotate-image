import React from 'react';
import PropTypes from 'prop-types'

const Navbar = ({title}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                    </ul>
                    <span className="navbar-text d-flex justify-content-end">
                        Navbar text with an inline element
                    </span>
                </div>
            </div>
        </nav>
    );
}

Navbar.defaultProps = {
    title: 'Amass-Annotate-Image'
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired
}

export default Navbar