import React, {useRef, useEffect, useState} from 'react';

const AnnotateImageThumbnail = ({id, src, name, onClick, itemEls, imageElemList, setImageElemList}) => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const image = new Image();
    const canvasThumb = useRef(null);

    useEffect( () => {
        image.src = src;
        image.id = id;
        image.crossOrigin = "Anonymous";
        image.onload = (e) => {
            console.log("image Thumbnail loaded");
            const ctx = itemEls.current[id].getContext('2d');
            ctx.drawImage(image,0,0, width, height); 
            setImageElemList(imageElemList => [...imageElemList, image]);
        }
    }, []);

    return (
        <React.Fragment> 
            {/* <img src={src} alt={name} id={id} onClick={onClick}
            ref={(element) => itemEls.current[id] = element}
            style={{maxWidth: '10rem'}} className="img-thumbnail"></img> */}
            <canvas ref={(element) => itemEls.current[id] = element} 
                width={width} height={height} className="p-3"
                onClick={onClick} id={"imageThumbcanvas_" + id } />
            
        </React.Fragment>
    );
}

export default AnnotateImageThumbnail