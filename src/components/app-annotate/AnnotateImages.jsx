import React, {useRef} from 'react';
import AnnotateImageToolbox from './AnnotateImageToolbox';
import AnnotateImageItem from './AnnotateImageItem';

const AnnotateImages = (props) => {

    const canvasId = useRef(null);

    return (
        <React.Fragment>
            <div className="w-100 mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <div className="p-2 bd-highlight align-self-center">
                            <AnnotateImageToolbox canvas={canvasId} />
                    </div>
                    <div className="p-2 align-self-center">
                        <AnnotateImageItem canvas={canvasId}/>
                    </div>
                    <div className="p-2 bd-highlight align-self-center">Flex item 3</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AnnotateImages