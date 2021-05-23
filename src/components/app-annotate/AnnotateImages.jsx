import React, { useRef, useState, useEffect } from 'react';
import AnnotateImageToolbox from './AnnotateImageToolbox';
import AnnotateImageItem from './AnnotateImageItem';
import AnnotateImageThumbnail from './AnnotateImageThumnail';
import PropTypes from 'prop-types';
import WebWorker from "react-webworker"

const AnnotateImages = ({ images }) => {

    const canvasId = useRef(null);
    const itemEls = useRef({})

    const [activeImage, setActiveImage] = useState(null);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        let templist = [];
        for (const image of images) {
            if (image.checked) templist.push(image);
        }
        setImageList(templist);
    }, []);

    const onClick = e => {
        setActiveImage(e.target);
        const octx = canvasId.current.getContext('2d');
        octx.clearRect(0, 0, 500, 400);
        octx.drawImage(e.target, 0, 0, 500, 400);
    }

    return (<WebWorker url="/js/cv.worker.js">
        {({ data, error, postMessage, updatedAt, lastPostAt }) => (
            <React.Fragment>
                <div className="w-100 mt-5">
                    <div className="d-flex flex-row justify-content-between">
                        <div className="p-2 bd-highlight align-self-start">
                            <AnnotateImageToolbox canvas={canvasId} />
                        </div>
                        <div className="p-2 align-self-start">
                            <AnnotateImageItem canvas={canvasId} data={data} postMessage={postMessage} activeImage={activeImage} />
                        </div>
                        <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                            <div className="d-flex flex-column align-self-start">
                                {imageList.map((image, index) => {
                                    return <AnnotateImageThumbnail onClick={onClick} postMessage={postMessage}
                                    itemEls={itemEls} key={image.id} id={image.id} src={image.src} name={image.name} />
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )}
    </WebWorker>);
}

AnnotateImages.propTypes = {
    images: PropTypes.array.isRequired
}

export default AnnotateImages