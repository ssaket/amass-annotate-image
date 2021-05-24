import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import ImagePagination from './ImagePagination';

import ImageFilter from './ImageFilter';
import './style.css';

const Images = ({ images, loading }) => {

    const [count, setCount] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(20);
    const [visibleImages, setVisibleImages] = useState(images.slice(startIndex, endIndex));
    // const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const list = images.slice(startIndex, endIndex);
        const imageList =  list.map((image) => {
            return <ImageItem key={image.id}
                image={image} count={count} setCount={setCount} />
        });
        setVisibleImages(imageList);
    }, [count, endIndex, images, loading, startIndex]);


    const handlePagination = e => {
        if(e.type === 'change'){
            setEndIndex(e.target.value);
        }
        if(e.type === 'click'){
            setStartIndex(e.startIndex);
            setEndIndex(e.endIndex);
        }
        console.log(e);
    }

    return (
        <React.Fragment>
            <div className="m-3 p-3">
                <h4 className="text-center">Select the images to annotate</h4><hr />
            </div>
            <div className="my-5 w-100">
                <div className="d-fex flex-wrap">
                    <div className="image-filters">
                        <Link to={'/'} className="badge badge-secondary">Go Back</Link>
                        <ImageFilter handlePagination={handlePagination} images={visibleImages} count={count} totalCount={images.length} setCount={setCount} />
                    </div>
                    <div className="d-flex justify-content-center flex-wrap">
                        {loading && <Spinner styleName={"spinner-border"} />}
                        {!loading && visibleImages}
                    </div>
                </div>
                {!loading &&
                    <div className="position-relative">
                        <ImagePagination className="position-absolute bottom-0 start-50 translate-middle-x" handlePagination={handlePagination} totalCount={images.length} count={visibleImages.length} />
                    </div>
                }

            </div>
        </React.Fragment>
    );
}

Images.propTypes = {
    images: PropTypes.array.isRequired
}

export default Images