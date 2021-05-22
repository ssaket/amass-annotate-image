import React from 'react';
import PropTypes from 'prop-types';

const ImageItem = ({ image }) => {

    const { id, src } = image;
    
    const onChange = e => {
        image.checked = {};
        image.checked[e.target.id] = e.target.checked;
        console.log(image, image.checked);
    }
    
    return (
        <React.Fragment>
            <div id={id} className="card m-3 px-3" style={{ width: '18rem' }}>
                <img src={src} loading="lazy" className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="card-text">
                        <div className="form-check">
                            <input onChange={onChange} className="form-check-input" type="checkbox" value="" id={'src_' + id} checked={image.checked[id]} />
                            <label className="form-check-label" htmlFor={id}>
                                Annotate
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ImageItem