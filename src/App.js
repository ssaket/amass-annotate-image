import Navbar from './components/common/Navbar'
import React, {useState} from 'react';
import ImageSearch from './components/app-search/ImageSearch';
import Images from './components/app-image/Images';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ImageSearchManager } from './main/app-api/SearchManager';

import './bootstrap.min.css';

const App = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const searchImages = async (text, sources) => {
    ImageSearchManager.reset();
    Object.entries(sources).forEach(([key, value]) => value ? ImageSearchManager.addSource(key) : null);
    const data = await ImageSearchManager.getImagesByName(text);
    setImages(data);
    setLoading(false);
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <ImageSearch
                  searchImages={searchImages}
                  setLoading={setLoading}
                /></React.Fragment>
            )
            }></Route>
            <Route exact path="/images" render={props => (
              <React.Fragment>
                <Images images={images} loading={isLoading} />
              </React.Fragment>
            )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
