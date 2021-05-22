import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageItem = ({ image, count, setCount }) => {

    const { id, src, checked } = image;
    const [isChecked, setChecked] = useState(false);

    const onChange = e => {
        if(e.target.checked) 
            setCount(count+1);
        else
            setCount(count-1);
        setChecked(e.target.checked);
    }

    return (
        <React.Fragment>
            <div className="m-2 px-3">
                <figure className="figure">
                    <img src={src} loading="lazy"  style={{ maxWidth: '15rem' }} className="figure-img img-fluid rounded" alt="..." />
                    <figcaption className="figure-caption text-end">
                        <div className="form-check">
                            <input onChange={onChange} className="form-check-input" type="checkbox" value="" id={'src_' + id} checked={checked ? checked : isChecked} />
                            <label className="form-check-label" htmlFor={id}>
                                Annotate
                            </label>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </React.Fragment>
    );
}

ImageItem.propTypes = {
    image: PropTypes.object.isRequired
}

export default ImageItem