import React, { useRef, useState, useEffect } from 'react';
import AnnotateImageItem from './AnnotateImageItem';
import AnnotateImageThumbnail from './AnnotateImageThumnail';
import PropTypes from 'prop-types';
import WebWorker from "react-webworker"

const AnnotateImages = ({ images }) => {

    const canvasId = useRef(null);
    const itemEls = useRef({});
    const [imageElemList, setImageElemList] = useState([]);

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
        // console.log("mini canvas clicked");
        // const octx = canvasId.current.getContext('2d');
        // octx.clearRect(0, 0, 500, 400);
        // const img =  imageElemList.find(({id}) => "imageThumbcanvas_" + id === e.target.id);
        // octx.drawImage(img, 0, 0, 500, 400);
    }

    return (<WebWorker url="/js/cv.worker.js">
        {({ data, error, postMessage, updatedAt, lastPostAt }) => (
            <React.Fragment>
                <div className="w-100 mt-5">
                    {/* <div className="row" style={{height: '30rem'}}>
                        <div className="col-2">
                            <AnnotateImageToolbox canvas={canvasId} />
                        </div>
                        <div className="col-10">
                            <AnnotateImageItem canvas={canvasId} imageElemList={imageElemList} data={data} postMessage={postMessage} activeImage={activeImage} />
                        </div>
                    </div> */}
                    <AnnotateImageItem canvas={canvasId} imageElemList={imageElemList} data={data} postMessage={postMessage} activeImage={activeImage} />
                    <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                            <div className="d-flex flex-row">
                                {imageList.map((image, index) => {
                                    return <AnnotateImageThumbnail onClick={onClick} postMessage={postMessage}
                                    itemEls={itemEls} key={image.id} 
                                    imageElemList={imageElemList} setImageElemList={setImageElemList}
                                    id={image.id} src={image.src} name={image.name} />
                                })
                                }   
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