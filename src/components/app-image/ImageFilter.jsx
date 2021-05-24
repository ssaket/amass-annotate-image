import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import ImagePagination from './ImagePagination';

const ImageFilter = ({ images, count, setCount, totalCount, handlePagination }) => {

    const history = useHistory();

    const [isChecked, setCheckbox] = useState(false);

    const onChange = e => {
        setCheckbox(e.target.checked);
        let curr_cnt = 0;
        for (const image of images) {
            curr_cnt++;
            image.checked = e.target.checked;
        }

        e.target.checked ? setCount(curr_cnt) : setCount(0);
    }

    const onSubmit = e => {
        history.push('/annotate');
    }

    return (
        <React.Fragment>
            <form className="my-4" onSubmit={onSubmit}>
                <fieldset>
                    <legend>filters</legend>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Search for Description</label>
                        <input type="text" id="description" className="form-control form-control-sm" placeholder="Search" />
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="imageperpages" className="form-label">Items per page </label>
                            </div>
                            <div className="col">
                                <select id="imageperpages" onChange={handlePagination} className="form-select form-select-sm">
                                    <option>20</option>
                                    <option>30</option>
                                    <option>40</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-check">
                            <input onChange={onChange} checked={isChecked} className="form-check-input" type="checkbox" id="selectAll" />
                            <label className="form-check-label" htmlFor="selectAll">
                                Select All
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-text">
                            <p>Total images: {totalCount}</p>
                            <p>Selected: {count}</p>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Annotate</button>
                </fieldset>
            </form>
        </React.Fragment>
    )
}

export default ImageFilter