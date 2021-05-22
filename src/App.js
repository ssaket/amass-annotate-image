import Navbar from './components/common/Navbar'
import React from 'react';
import ImageSearch from './components/app-search/ImageSearch';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ImageSearchManager } from './components/app-api/SearchManager';

import './bootstrap.min.css';

const App = () => {

  const searchImages = async (text, sources) => {
    ImageSearchManager.reset();
    Object.entries(sources).forEach(([key, value]) => value? ImageSearchManager.addSource(key):null); 
    const data = await ImageSearchManager.getImagesByName(text);
    console.log(data);
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
                /></React.Fragment>
            )
            }></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
