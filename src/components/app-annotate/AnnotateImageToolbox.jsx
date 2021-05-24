import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import paper from 'paper';
import ToolBox from '../../main/app-annotate/ToolBox';

// import cv from '../../AnnotateManager';

const AnnotateImageToolbox = ({ canvas, img }) => {

    const [paperScope, setPaperScope] = useState({});
    const [isPaperOn, setPaperOn] = useState(false);
    const [selectedTool, setSelectedTool] = useState('');
    const [paperToolBox, setPapeToolBox] = useState({});

    useEffect(() => {
        if (!isPaperOn) {
            console.log("setting up canvas");
            paper.setup(canvas.current);
            const scope = {};
            paper.install(scope);
            setPaperScope(scope);
            const toolStack = new ToolBox(scope, ['freehand', 'circle']);
            setPapeToolBox(toolStack);
            // setPaperTool(new PaperToolBox(scope));
            // canvas.current.width, canvas.current.height
            setPaperOn(true);
        }
    }, [img]);

    const [useOpenCV, setOpenCV] = useState({
        isOn: false,
        data: {}
    });

    const handleSelectTool = (e) => {

        const raster = new paperScope.Raster(img);
        raster.fitBounds(paperScope.view.bounds);
        // let tool = new paperScope.Tool();
        // let path;

        switch (e.target.value) {
            case "freehand":
                paperToolBox.activateTool('freehand');
                // tool.onMouseDown = function (event) {
                //     path = new paperScope.Path();
                //     path.strokeColor = 'black';
                // }

                // tool.onMouseDrag = (event) => {
                //     path.add(event.point);
                // }
                break;
            case "bbox":
                paperToolBox.activateTool('circle');
                // let rect;
                // tool.onMouseDown = function (event) {
                //     let circle = new paperScope.Path.Circle({
                //         center: event.point,
                //         radius: 5
                //     });
                //     circle.strokeColor = 'black';
                //     circle.fillColor = 'white';
                // }
                break;
            default:
        }

        setSelectedTool(e.target.value)
    }

    return (
        <React.Fragment>
            {/* {useOpenCV.isOn &&
            } */}
            <div className="w-10">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        OpenCV Operations
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={handleSelectTool} className="form-check-input" type="radio" name="paperTool" id="paperTool3" value="poly" checked={selectedTool === 'ploy'} />
                    <label className="form-check-label" htmlFor="paperTool3">
                        Polygon
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={handleSelectTool} className="form-check-input" type="radio" name="paperTool" id="paperTool1" value="bbox" checked={selectedTool === 'bbox'} />
                    <label className="form-check-label" htmlFor="paperTool1">
                        Rectange
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={handleSelectTool} className="form-check-input" type="radio" name="paperTool" id="paperTool2" value="freehand" checked={selectedTool === 'freehand'} />
                    <label className="form-check-label" htmlFor="paperTool2">
                        Free Hand
                    </label>
                </div>
                {/* <div className="form-check">
                    <label htmlFor="customRange1" className="form-label">Example range</label>
                    <input type="range" className="form-range" id="customRange1" />
                </div> */}
            </div>
        </React.Fragment>
    );
}

export default AnnotateImageToolbox