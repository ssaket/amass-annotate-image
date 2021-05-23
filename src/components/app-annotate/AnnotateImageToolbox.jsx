import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import cv from '../../AnnotateManager';

const AnnotateImageToolbox = ({ canvas }) => {
    
    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        console.log(ctx);
    }, []);

    const [useOpenCV, setOpenCV] = useState({
        isOn: false,
        data: {}
    });

    return (
        <React.Fragment>
            {/* {useOpenCV.isOn &&
            } */}
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