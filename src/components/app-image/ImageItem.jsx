import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageItem = ({ image }) => {

    const { id, src, checked } = image;
    const [isChecked, setChecked] = useState(false);

    const onChange = e => {
        setChecked(e.target.checked);
    }

    return (
        <React.Fragment>
            <div id={id} className="card m-3 px-3" style={{ maxWidth: '18rem' }}>
                <img src={src} loading="lazy" className="card-img-top" alt={id} />
                <div className="card-body">
                    <div className="card-text">
                        <div className="row">
                            <div className="col-auto">
                                <div className="form-check">
                                    <input onChange={onChange} className="form-check-input" type="checkbox" value="" id={'src_' + id} checked={checked ? checked : isChecked} />
                                    <label className="form-check-label" htmlFor={id}>
                                        Annotate
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto">
                               <p>{image.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

ImageItem.propTypes = {
    image: PropTypes.object.isRequired
}

export default ImageItem