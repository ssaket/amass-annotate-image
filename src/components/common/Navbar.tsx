import * as React from 'react';
import {Link} from 'react-router-dom';

type NavbarProps = {
    title?: string
}
const Navbar = ({title = 'Amass-Annotate-Image'}: NavbarProps) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>{title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                    <span className="navbar-text">
                        Quickly Seach and Annotate images online.
                    </span>
                </div>
            </div>
        </nav>
    );
}
export default Navbar