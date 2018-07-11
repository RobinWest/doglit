import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './css/App.css';

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
        <header className="App__header">
          <h1 className="App__header--title">DOGLIT</h1>
        </header>
        {this.props.viewStore.currentView.currentDogUrl.state}
        {this.props.viewStore.currentView.currentDogUrl.value}
        {/* breed select */}
        {/* hero image */}
        {/* doglit selectors */}
      </div>
    );
  }
}

export default App;
