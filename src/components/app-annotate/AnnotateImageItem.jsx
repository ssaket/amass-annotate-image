import React, {useEffect, useState} from 'react';
import {paper} from 'paper';

const AnnotateImageItem = ({canvas}) => {
    
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(400);

    useEffect(( ) => {
        paper.setup(canvas.current);
        const point1 = new paper.Point(0, 0);
        const point2 = new paper.Point(width, 0);
        const point3 = new paper.Point(width, height);
        const point4 = new paper.Point(0, height);

        const path1 = new paper.Path(point1, point3);
        const path2 = new paper.Path(point2, point4);

        path1.strokeColor = 'black';
        path2.strokeColor = 'black';
       
    }, []);

    return (
        <React.Fragment>
            <canvas ref={canvas} id="canvas" width={width} height={height} />
        </React.Fragment>
    );
}

export default AnnotateImageItem