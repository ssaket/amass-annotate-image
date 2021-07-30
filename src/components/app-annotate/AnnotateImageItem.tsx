import React, { useEffect, useState } from 'react';
import AnnotateImageToolbox from './AnnotateImageToolbox';
import cv from '../../services/cv';

type AnnotateImageItemProps = {
    canvas: any,
    activeImage: any,
    imageElemList: any,
    data: any
}

const AnnotateImageItem = ({ canvas, activeImage, imageElemList, data }: AnnotateImageItemProps) => {

    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);
    const [activeImg, setActiveImg] = useState(null);
    const [processing, setProcessing] = useState(false)

    async function onClick(ctx: any, w: number, h: number): Promise<void> {
        setProcessing(true);
        // Load the model
        await cv.load();
        // Processing image
        const image = ctx.getImageData(0, 0, w, h);
        const processedImage = await cv.imageProcessing(image);
        // Render the processed image to the canvas
        console.log("payload", processedImage.data.payload);
        ctx.putImageData(processedImage.data.payload, 0, 0);
        setProcessing(false);
    }


    useEffect(() => {

        if (!activeImage) return;

        console.log("raster", width, height);
        console.log("mini canvas clicked");

        const octx = canvas.current.getContext('2d');
        console.log(canvas.current.width, canvas.current.height)
        octx.clearRect(0, 0, width, height);
        const img = imageElemList.find(({ id }: any) => "imageThumbcanvas_" + id === activeImage.id);
        setActiveImg(img);
        octx.drawImage(img, 0, 0, width, height);
        // onClick(octx, canvas.current.width, canvas.current.height);

    }, [activeImage]);

    return (
        <React.Fragment>
            <div className="row" style={{ height: '30rem' }}>
                <div className="col-2">
                    <AnnotateImageToolbox canvas={canvas} img={activeImg}/>
                </div>
                <div className="col-10">
                    <canvas ref={canvas} id="canvas" width={width} height={height} />
                </div>
                {data && <h3>JSON.stringify(data)</h3>}
            </div>
        </React.Fragment>
    );
}

export default AnnotateImageItem