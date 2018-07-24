import React from 'react';
import ReactDOM from 'react-dom';

import ViewStore from './ViewStore';

describe('ViewStore', () => {
  let viewStore,
      promiseHelper;

  beforeEach(function(){
    const fauxPromise = new Promise((resolve, reject) => {
            promiseHelper = {
              resolve: resolve,
              reject: reject
            }
          });

    function DoglitStore(){
        this.collection = [];

        this.nextDogUrl = () => {};
        this.previousDogUrl = () => {};
    };

    const dogService = {
      fetchBreedImages: () => {},
      fetchBreedList: () => {},
      fetchRandomDog: () => {}
    };

    spyOn(dogService, 'fetchBreedImages').and.returnValue(fauxPromise);
    spyOn(dogService, 'fetchBreedList').and.returnValue(fauxPromise);
    spyOn(dogService, 'fetchRandomDog').and.returnValue(fauxPromise);

    viewStore = new ViewStore(dogService, DoglitStore);

    spyOn(viewStore.doglitStore, 'nextDogUrl').and.returnValue(fauxPromise);
    spyOn(viewStore.doglitStore, 'previousDogUrl').and.returnValue(fauxPromise);
    // spyOn(viewStore, 'initRandom');
  });

  it('instantiates with defaults', () => {
    expect(viewStore.service).toBeDefined();
    expect(viewStore.doglitStore).toBeDefined();

    expect(viewStore.fetchBreedInProgress).toBe(false);

    expect(viewStore.currentBreedNames).toBeDefined();
    expect(viewStore.currentBreedNames.breedName).toBe(undefined);
    expect(viewStore.currentBreedNames.subBreedName).toBe(undefined);

    expect(viewStore.currentView).toBeDefined();
    expect(viewStore.currentView.breedList).toBe(null);
    expect(viewStore.currentView.selectedBreed).toBe(undefined);
    expect(viewStore.currentView.currentDogUrl).toBe(null);
    expect(viewStore.currentView.nextDogUrl).toBe(null);
    expect(viewStore.currentView.previousDogUrl).toBe(null);
  });

  it('should fetch 2 random dogs from service on initRandom()', async () => {
    viewStore.initRandom();

    expect(viewStore.service.fetchRandomDog).toHaveBeenCalled();
    expect(viewStore.service.fetchRandomDog.calls.count()).toBe(2);

    promiseHelper.resolve({message: 'doglitUrl'});
    
    await Promise.all([viewStore.currentView.currentDogUrl, viewStore.currentView.nextDogUrl]);

    expect(viewStore.doglitStore.collection.length).toBe(2);
    expect(viewStore.currentDoglitBreed).not.toBeDefined();
    expect(viewStore.currentDoglitSubBreed).not.toBeDefined();
  });

  it('updateDog() should set current dog and extract breed names from url', async () => {
    const dogUrl = 'https://my.dog.url/breeds/green-boogaloo/somethin123.jpg',
          currentDogPromise = new Promise((resolve, reject) => {
            resolve(dogUrl);
          });

    await viewStore.updateDog(currentDogPromise);

    expect(viewStore.currentView.currentDogUrl.value).toBe(dogUrl);
    expect(viewStore.currentDoglitBreed).toBe('green');
    expect(viewStore.currentDoglitSubBreed).toBe('boogaloo');
  });

});
