import React from 'react';

const AnnotateImageThumbnail = ({id, src, name, onClick, itemEls}) => {
    return (
        <React.Fragment> 
            <img src={src} alt={name} id={id} onClick={onClick}
            ref={(element) => itemEls.current[id] = element}
            style={{maxWidth: '10rem'}} className="img-thumbnail"></img>
        </React.Fragment>
    );
}

export default AnnotateImageThumbnail