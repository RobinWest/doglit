import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './css/App.css';

import ImageLoader from './container/ImageLoader'
import DoglitHero from './component/DoglitHero';

@inject('viewStore')
@observer class App extends Component {
  constructor(props){
    super(props);

    props.viewStore.initRandom();
    // props.viewStore.selectBreed('beagle');
  }

  render() {
    return (
      <div className="App">
        <div className="App__container">
          <header className="App__header">
            <h1 className="App__header--title">DOGLIT</h1>
          </header>

          <div className="App__hero">
            <ImageLoader state={this.props.viewStore.currentView.currentDogUrl.state} imageUrl={this.props.viewStore.currentView.currentDogUrl.value}>
              <DoglitHero />
            </ImageLoader>
          </div>

          <div className="App__controls">
            [previous] [next]
          </div>
        </div>
      </div>
    );
  }
}

export default App;
