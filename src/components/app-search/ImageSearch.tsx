import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

type ImageSearchProps = {
    searchImages: Function,
    setLoading: Function
}


const ImageSearch = ({ searchImages, setLoading } : ImageSearchProps) => {
    
    const history = useHistory();

    const [imageList, setImageList] = React.useState<string | boolean | undefined>('');

    const [source, setSource] = useState({
        flickr: false,
        pexels: false,
        pixabay: false,
        unsplash: false
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target === 'checkbox' ? e.target.checked : e.target.value;
        switch (e.target.type) {
            case 'checkbox':
                setSource({ ...source, [e.target.id]: value });
                break;
            default:
                setImageList(value);
        }
    }

    return (
        <>
            <div className="mx-auto image-center">
                <form onSubmit={onSubmit} className="d-flex flex-row justify-content-center">
                    <div className="align-self-center px-3">
                        <div className="form-check form-switch">
                            <input onChange={onChange} checked={source.flickr} className="form-check-input" type="checkbox" id="flickr" />
                            <label className="form-check-label" htmlFor="flickr">Flickr</label>
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
                            <input onChange={onChange} type="text" className="form-control" id="imageList" placeholder="search for images" value={imageList as string} />
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-primary mb-3">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ImageSearch