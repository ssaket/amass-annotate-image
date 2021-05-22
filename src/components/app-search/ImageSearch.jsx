import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

const ImageSearch = ({ searchImages, setLoading }) => {
    
    const history = useHistory();

    const [imageList, setImageList] = useState('');

    const [source, setSource] = useState({
        flickr: false,
        pexels: false,
        pixabay: false,
        unsplash: false
    });

    const onSubmit = e => {
        e.preventDefault();
        if (imageList === '' || !Object.values(source).includes(true)) {
            //this.props.setAlert('');
            console.log("Invalid Search");
        } else {
            setLoading(true);
            searchImages(imageList, source);
            setImageList('');
            history.push('/images');
        }
    }

    const onChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        switch (e.target.type) {
            case 'checkbox':
                setSource({ ...source, [e.target.id]: value });
                break;
            default:
                setImageList(value);
        }
    }

    return (
        <React.Fragment>
            <div className="mx-auto image-center">
                <form onSubmit={onSubmit} className="d-flex flex-row justify-content-center">
                    <div className="align-self-center px-3">
                        <div className="form-check form-switch">
                            <input onChange={onChange} checked={source.flickr} className="form-check-input" type="checkbox" id="flickr" />
                            <label className="form-check-label" htmlFor="flickr"> Flickr</label>
                        </div>
                        <div className="form-check form-switch">
                            <input onChange={onChange} checked={source.pexels} className="form-check-input" type="checkbox" id="pexels" />
                            <label className="form-check-label" htmlFor="pexels">Pexel</label>
                        </div>
                        <div className="form-check form-switch">
                            <input onChange={onChange} checked={source.pixabay} className="form-check-input" type="checkbox" id="pixabay" />
                            <label className="form-check-label" htmlFor="pixabay">Pixabay</label>
                        </div>
                        <div className="form-check form-switch">
                            <input onChange={onChange} checked={source.unsplash} className="form-check-input" type="checkbox" id="unsplash" />
                            <label className="form-check-label" htmlFor="unsplash">Unsplash</label>
                        </div>
                    </div>
                    <div className="row w-40 align-self-center px-5">
                        <div className="col-8">
                            <input onChange={onChange} type="text" className="form-control" id="imageList" placeholder="search for images" value={imageList} />
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-primary mb-3">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

ImageSearch.propTypes = {
    searchImages: PropTypes.func.isRequired
}

export default ImageSearch