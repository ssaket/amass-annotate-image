import React from 'react';
import AnnotateImageFilter from './AnnotateImageFilter';
import AnnotateImageItem from './AnnotateImageItem';

const AnnotateImages = (props) => {

    return (
        <React.Fragment>
            <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                <AnnotateImageFilter />
                </div>
                <div className="p-2 bd-highlight">
                    <AnnotateImageItem />
                </div>
                <div className="p-2 bd-highlight">Flex item 3</div>
            </div>
        </React.Fragment>
    );
}

export default AnnotateImages