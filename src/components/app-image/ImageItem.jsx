import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

const ImageItem = ({ image, count, setCount }) => {

    const { id, src, checked, name } = image;
    const [isChecked, setChecked] = useState(false);
    const [isImageLoaded, setImageLoaded] = useState(false);

    const onChange = e => {
        if (e.target.checked)
            setCount(count + 1);
        else
            setCount(count - 1);
        setChecked(e.target.checked);
    }

    const onImageLoad = e => {
        setImageLoaded(true);
    }

    return (
        <React.Fragment>
            <div className="m-2 px-3">
                <figure className="figure">
                    {!isImageLoaded &&
                        <Spinner styleName={"text-warning text-center"} />}
                    <img src={src} loading="lazy" style={{ maxWidth: '15rem' }} onLoad={onImageLoad} className="figure-img img-fluid rounded" alt={name} />
                    <figcaption className="figure-caption text-end">
                        <div className="form-check">
                            {isImageLoaded && <React.Fragment>
                                <input onChange={onChange} className="form-check-input" type="checkbox" value="" id={'src_' + id} checked={checked ? checked : isChecked} />
                                <label className="form-check-label" htmlFor={id}>
                                    Annotate
                                </label>
                            </React.Fragment>
                            }
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