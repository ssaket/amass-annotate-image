import React, { useEffect, useState } from 'react';
import WebWorker from "react-webworker"
import cv from '../../services/cv';

import { paper } from 'paper';

const AnnotateImageItem = ({ canvas, activeImage, postMessage, data }) => {

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(400);
    const [processing, setProcessing] = useState(false)

    const [pr, setPaper] = useState(paper.setup(canvas.current));

    async function onClick(ctx, img, w,h, octx) {
        setProcessing(true)
    
        // const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const image = ctx.getImageData(0, 0, w, h)
        // Load the model
        await cv.load()
        // Processing image
        const processedImage = await cv.imageProcessing(image)
        // Render the processed image to the canvas
        octx.putImageData(processedImage.data.payload, 0, 0)
        setProcessing(false)
      }
    

    // const myWorker = new Worker("/js/cv.worker.js");
    // // myWorker.postMessage([width, height]);
    // myWorker.onmessage = function (e) {
    //     // result.textContent = e.data;
    //     console.log('Message received from worker', e.data);
    // }

    useEffect(() => {
        if(!activeImage) return;
        console.log("applying ratser", activeImage);
        console.log("raster", activeImage.naturalWidth, activeImage.naturalHeight);
        // setWidth(activeImage.naturalWidth);
        // setHeight(activeImage.naturalHeight)

        const w =activeImage.naturalWidth;
        const h= activeImage.naturalHeight;

        const ncanvas = document.createElement('canvas');
        const ctx = ncanvas.getContext('2d');
        const octx = canvas.current.getContext('2d');
        // octx.clearRect(0, 0, 500, 400);
        const img = document.getElementById(activeImage.id);
        console.log(img);
        // octx.drawImage(img, 0, 0, 500, 400);

        console.log(ctx);
        console.log(w, h);
        // onClick(ctx, activeImage, w, h, octx);
        // ctx.fillStyle = '#000000';
        // ctx.fillRect(0, 0, activeImage.naturalWidth, activeImage.naturalHeight)
        // canvas.current.toBlob(function(blob) {        // get content as JPEG blob
        //     // here the image is a blob
        //   }, "image/jpeg", 0.75);
        // ctx.fillRect(0, 0, activeImage.naturalWidth, activeImage.naturalHeight)
       
        // const raster = new paper.Raster(activeImage.id);
        // raster.position = paper.view.center;

        // raster.on('load', () => {
        //   //  raster.size = new paper.Size(activeImage.width,  activeImage.height);
        // });

    }, [activeImage]);

    return (
        <React.Fragment>
            {data && <h3>JSON.stringify(data)</h3>}
            <canvas ref={canvas} id="canvas" style={{width: width, height: height}} />
        </React.Fragment>
    );
}

export default AnnotateImageItem