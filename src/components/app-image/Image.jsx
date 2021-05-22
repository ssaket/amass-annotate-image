import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Image = () => {
    useEffect(() => {
        console.log("hi");
    }, []);

    const name = "Image 1";
    const src = "hjjdjdjd";

    return (
        <React.Fragment>
            <div className="card" style="width: 18rem;">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </React.Fragment>
    );
}