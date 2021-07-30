import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import paper from 'paper';
import ToolBox from '../../main/app-annotate/ToolBox';

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
            const toolStack = new ToolBox(scope, ['freehand', 'circle', 'rectangle']);
            setPapeToolBox(toolStack);
            setPaperOn(true);
        }
    }, [img]);

    const [useOpenCV, setOpenCV] = useState({
        isOn: false,
        data: {}
    });

    const download = () => {
        var img    = canvas.current.toDataURL("image/png");
        document.write('<img src="'+img+'"/>');
    }
   

    const handleSelectTool = (e) => {

        const raster = new paperScope.Raster(img);
        raster.fitBounds(paperScope.view.bounds);
        // let tool = new paperScope.Tool();
        // let path;

        switch (e.target.value) {
            case "freehand":
                paperToolBox.activateTool('freehand');
                break;
            case "bbox":
                paperToolBox.activateTool('rectangle');
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
                 <div className="form-check">
                    <label htmlFor="customRange1" onClick={download} className="form-label text-primary">Download</label>
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