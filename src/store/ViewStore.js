import { observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

export class ViewStore {
  @observable currentView = {
    selectedBreed: null,
    currentDogUrl: null,
    nextDogUrl: null,
    previousDogUrl: null
  };

  constructor(service, Store){
    this.service           = service;
    this.doglitStore       = new Store();
    // this.randomDoglitStore = new Store();

    // this.cache = {};
  }

  @action initRandom(){
    const currentDogPromise = this.service.fetchRandomDog().then(res => res.message),
          nextDogPromise = this.service.fetchRandomDog().then(res => res.message);

    this.currentView = {
      currentDogUrl: fromPromise(currentDogPromise),
      nextDogUrl: fromPromise(nextDogPromise),
      previousDogUrl: fromPromise(new Promise((r, reject) => reject(null)))
    };
  }

  @action updateCollection(collection){
    this.doglitStore.collection = collection;

    this.updateDog(new Promise((resolve) => { resolve(this.doglitStore.collection[0]) }))
  }

  @action updateDog(newDogPromise = new Promise((r, reject) => reject(null))){
    this.currentView = {
      currentDogUrl: fromPromise(newDogPromise),
      nextDogUrl: fromPromise(this.doglitStore.nextDogUrl(newDogPromise)),
      previousDogUrl: fromPromise(this.doglitStore.previousDogUrl(newDogPromise))
    };
  }

  @action nextDog(){
    const newDogPromise = this.doglitStore.getNextDog(this.currentView.currentDogUrl);

    this.updateDog(newDogPromise);
  }

  @action previousDog(){
    const newDogPromise = this.doglitStore.getPreviousDog(this.currentView.currentDogUrl);

    this.updateDog(newDogPromise);
  }

  @action selectBreed(breed){
    // TODO - maybe...
    // if(breed && typeof this.cache[breed] !== 'undefined')
    //   // load cached breed
    // else
    //   // load a new breed and save it to cache

    this.currentView.breed = breed;
    this.updateDog(this.service.fetchBreedImages(breed).then(res => res.message[0]));
  }

}

export default ViewStore;
