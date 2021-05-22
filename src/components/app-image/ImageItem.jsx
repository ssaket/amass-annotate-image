import React from 'react';
import PropTypes from 'prop-types';

const ImageItem = ({image}) => {
    const { name, src } = image;
    return (
        <React.Fragment>
            <div className="card" style="width: 18rem;">
                <img src={src} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Som</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ImageItem