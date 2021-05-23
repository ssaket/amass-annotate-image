import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

import ImageFilter from './ImageFilter';
import './style.css';

const Images = ({ images, loading }) => {

    const [count, setCount] = useState(0);

    const imageList = images.map((image) => {
        return <ImageItem key={image.id} 
        image={image} count={count} setCount={setCount}/>
    })

    return (
        <React.Fragment>
            <div className="m-3 p-3">
                <h4 className="text-center">Select the images to annotate</h4><hr />
            </div>
            <div className="my-5 w-100">
                <div className="image-filters">
                    <Link to={'/'} className="badge badge-secondary">Go Back</Link>
                    <ImageFilter images={images} count={count} setCount={setCount} />
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                    {loading && <Spinner styleName={"spinner-border"}/>}
                    {!loading && imageList}
                </div>
            </div>
        </React.Fragment>
    );
}

Images.propTypes = {
    images: PropTypes.array.isRequired
}

export default Images