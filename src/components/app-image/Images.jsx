import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';
import { Link } from 'react-router-dom';

import ImageFilter from './ImageFilter';
import './style.css';

const Images = ({ images }) => {

    const [count, setCount] = useState(0);

    const imageList = images.map((image) => {
        return <ImageItem key={image.id} 
        image={image} count={count} />
    })

    return (
        <React.Fragment>
            <div className="m-3 p-3">
                <h4 className="text-center">Select the images to annotate</h4><hr />
            </div>
            <div className="my-5 w-100">
                <div className="image-filters">
                    {/*  <Link to={'/'} className="badge badge-secondary">Go Back</Link>
                   <div className="row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">pages</label>
                        <div className="col-12">
                            <input type="text" className="form-control" id="inputPassword" />
                        </div>
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">search</label>
                        <div className="col-12">
                            <input type="text" className="form-control" id="inputPassword" />
                        </div>
                        <div className="col-12">
                            <div className="form-check mt-2 px-2">
                                <input onChange={onChange} checked={isChecked} className="form-check-input" type="checkbox" id="selectAll" />
                                <label className="form-check-label" htmlFor="selectAll">
                                    Select All
                                </label>
                            </div>
                            <p>count: {count}</p>
                        </div>
                    </div> */}
                    <ImageFilter images={images} count={count} setCount={setCount} />
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                    {imageList}
                </div>
            </div>
        </React.Fragment>
    );
}

Images.propTypes = {
    images: PropTypes.array.isRequired
}

export default Images