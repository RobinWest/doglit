import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './css/App.css';

import ImageLoader from './container/ImageLoader';
import DoglitHero from './component/DoglitHero';
import DoglitSelector from './component/DoglitSelector';

@inject('viewStore')
@observer class App extends Component {
  constructor(props){
    super(props);

    this.handleClickSelectorNext     = this.handleClickSelectorNext.bind(this);
    this.handleClickSelectorPrevious = this.handleClickSelectorPrevious.bind(this);

    props.viewStore.initRandom();
    // props.viewStore.selectBreed('beagle');
  }

  handleClickSelectorNext(){
    this.props.viewStore.nextDog();
  }
  handleClickSelectorPrevious(){
    this.props.viewStore.previousDog();
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
            <DoglitSelector 
              type="previous"
              onClick={this.handleClickSelectorPrevious}
              imageState={this.props.viewStore.currentView.previousDogUrl.state}
              imageUrl={this.props.viewStore.currentView.previousDogUrl.value}
            />
            <DoglitSelector 
              type="next"
              onClick={this.handleClickSelectorNext}
              imageState={this.props.viewStore.currentView.nextDogUrl.state}
              imageUrl={this.props.viewStore.currentView.nextDogUrl.value}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
