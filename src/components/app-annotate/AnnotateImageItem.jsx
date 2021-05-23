import React, { useEffect, useState } from 'react';
import WebWorker from "react-webworker"
import cv from '../../services/cv';

import { paper } from 'paper';

const AnnotateImageItem = ({ canvas, activeImage, postMessage, imageElemList, data }) => {

    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);
    const [isPaperOn, setPaperOn] = useState(false);
    const [processing, setProcessing] = useState(false)

    // const [pr, setPaper] = useState(paper.setup(canvas.current));

    async function onClick(ctx, w, h) {
        setProcessing(true);
        // Load the model
        await cv.load();
        // Processing image
        const image = ctx.getImageData(0, 0, width, height);
        const processedImage = await cv.imageProcessing(image);
        // Render the processed image to the canvas
        console.log("payload", processedImage.data.payload);
        ctx.putImageData(processedImage.data.payload, 0, 0);
        setProcessing(false);
    }


    useEffect(() => {

        if (!activeImage) return;
        const { cwidth, cheight } = canvas.current.getBoundingClientRect();
        if(!isPaperOn){
            paper.setup(canvas.current)
            setPaperOn(true);
        }

        console.log("applying ratser", activeImage);
        console.log("raster", width, height);
        console.log("mini canvas clicked");

        const octx = canvas.current.getContext('2d');
        octx.clearRect(0, 0, width, height);
        const img = imageElemList.find(({ id }) => "imageThumbcanvas_" + id === activeImage.id);
        octx.drawImage(img, 0, 0, 600, 400);
        // onClick(octx, 500, 400);

    }, [activeImage]);

    return (
        <React.Fragment>
                <canvas ref={canvas} id="canvas" width={width} height={height} />
                {data && <h3>JSON.stringify(data)</h3>}
        </React.Fragment>
    );
}

export default AnnotateImageItem