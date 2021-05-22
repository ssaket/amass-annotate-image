import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import cv from '../../AnnotateManager';

import WebWorker from "react-webworker"

const AnnotateImageToolbox = ({ canvas }) => {

    const [useOpenCV, setOpenCV] = useState({
        isOn: false,
        data: {}
    });

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
    }, []);

    return (
        <React.Fragment>
            <WebWorker url="/js/cv.worker.js">
                {({ data, error, postMessage, updatedAt, lastPostAt }) => (
                    <div>
                        {data && (
                            <div>
                                <strong>Received some data:</strong>
                                <pre>{JSON.stringify(data, null, 2)}</pre>
                            </div>
                        )}
                        <button onClick={() => postMessage("hello")} disabled={updatedAt < lastPostAt}>
                            {updatedAt < lastPostAt ? "Loading..." : "Go"}
                        </button>
                    </div>
                )}
            </WebWorker>
            <div className="w-10">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        Default checkbox
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                        Disabled checkbox
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                        Disabled checkbox
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                        Disabled checkbox
                    </label>
                </div>
                <div className="form-check">
                    <label htmlFor="customRange1" className="form-label">Example range</label>
                    <input type="range" className="form-range" id="customRange1" />
                </div>
            </div>
        </React.Fragment>
    );
}

export default AnnotateImageToolbox