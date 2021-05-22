import React from 'react';
import PropTypes from 'prop-types';

const Images = ({images}) => {
    return (
        <React.Fragment>
            {images.map(image => {
                <ImageItem key={image.toString()} image={image} />
            })}
        </React.Fragment>
    );
}

Images.propTypes = {
    images: PropTypes.array.isRequired
}

export default Images