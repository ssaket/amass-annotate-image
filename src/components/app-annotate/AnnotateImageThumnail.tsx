import React, {useEffect, useState} from 'react';
type AnnotateImageThumbnailProps = {
    id: string,
    src: string,
    name: string,
    onClick: any,
    itemEls: any,
    imageElemList: any,
    setImageElemList: any
}

const AnnotateImageThumbnail = ({id, src, name, onClick, itemEls, imageElemList, setImageElemList}: AnnotateImageThumbnailProps) => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const image = new Image();

    useEffect( () => {
        image.src = src;
        image.id = id;
        image.crossOrigin = "Anonymous";
        image.onload = (e) => {
            console.log("image Thumbnail loaded");
            const ctx = itemEls.current[id].getContext('2d');
            ctx.drawImage(image,0,0, width, height); 
            setImageElemList((imageElemList: any) => [...imageElemList, image]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment> 
            <canvas ref={(element) => itemEls.current[id] = element} 
                width={width} height={height} className="p-3"
                onClick={onClick} id={"imageThumbcanvas_" + id } />
            
        </React.Fragment>
    );
}

export default AnnotateImageThumbnail