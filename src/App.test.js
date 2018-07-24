import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import App from './App';

describe('Main App can render various states', () => {
  let viewStore;

  beforeEach(function(){
    viewStore = {
      currentView: {
        breedList: null,
        selectedBreed: undefined,
        currentDogUrl: fromPromise(() => null),
        nextDogUrl: fromPromise(() => null),
        previousDogUrl: fromPromise(() => null),
      },
      currentDoglitBreed: '',
      currentDoglitSubBreed: '',
      getBreedList: () => {},
      initRandom: () => {},
      selectBreed: () => {},
      updateBreed: () => {},
      nextDog: () => {},
      previousDog: () => {},
    };
     
  });

  it('renders without crashing', () => {
    const renderedApp = mount(
      <Provider viewStore={viewStore}>
        <App />
      </Provider>
    );
  });

});
