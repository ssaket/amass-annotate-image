import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';
import { Link } from 'react-router-dom';
import './style.css';

const Images = ({ images }) => {
    console.log("huhu", images);
    return (
        <React.Fragment>
            <div className="m-3 p-3">
                <h4 className="text-center">Select the images to annotate</h4><hr />
            </div>
            <div className="my-5 w-100">
                <div className="image-filters">
                    <Link to={'/'} className="badge badge-secondary">Go Back</Link>
                    <div className="">
                        <label for="inputPassword" className="col-sm-2 col-form-label">pages</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword" />
                        </div>
                        <div className="">
                            <label for="inputPassword" className="col-sm-2 col-form-label">search</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <div className="mt-2 p-3">
                            <div class="form-check">
                                <div className="col-sm-10">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                    <label class="form-check-label" for="defaultCheck1">
                                        Select All
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                    {images.map(image => {
                        image.checked = false;
                        return <React.Fragment>
                            <ImageItem key={image.id} image={image} />
                        </React.Fragment>
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}

Images.propTypes = {
    images: PropTypes.array.isRequired
}

export default Images