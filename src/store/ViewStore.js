import { observable, computed, action, reaction } from 'mobx';
import { fromPromise } from 'mobx-utils';

export class ViewStore {
  @observable fetchBreedInProgress = false;

  @observable currentBreedNames = {breedName: undefined, subBreedName: undefined};

  @observable currentView = {
    breedList: null,
    selectedBreed: undefined,
    currentDogUrl: null,
    nextDogUrl: null,
    previousDogUrl: null
  };

  constructor(service, Store){
    this.service     = service;
    this.doglitStore = new Store();

    reaction(
      () => { if(this.currentView.currentDogUrl) return this.currentView.currentDogUrl.value },
      url => {
        this.currentBreedNames = this.extractBreedFromUrl(url);
      }
    );

    // this.cache = {};
  }

  @computed get currentDoglitBreed(){
    return this.currentBreedNames.breedName;
  }

  @computed get currentDoglitSubBreed(){
    return this.currentBreedNames.subBreedName;
  }

  @action extractBreedFromUrl(url){
    console.log(url);
    const defaultBreeds = {breedName: undefined, subBreedName: undefined};

    if(!url)
      return defaultBreeds;

    // const urlRegExp = /(?:http[s]?:\/\/)?(?:[^/\r\n]+)(\/[^\r\n]*)?/gm;
    const urlRegExp = /https?:\/\/(?:[a-zA-Z0-9]*\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}(?:\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

    // Extract path section from url
    let path = urlRegExp.exec(url);

    if(!path)
      return defaultBreeds;

    // Remove path prefix
    path = path[1].replace('/breeds/', '');

    let extraction = path.substring(0, path.indexOf('/')),
        nameArray  = extraction.split('-');

    return {breedName: nameArray[0], subBreedName: nameArray[1]};
  }

  @action initRandom(){
    const currentDogPromise = this.service.fetchRandomDog().then(res => res.message),
          nextDogPromise = this.service.fetchRandomDog().then(res => res.message);

    Promise
      .all([currentDogPromise, nextDogPromise])
      .then(res => {
        this.doglitStore.collection = res;
      });

    this.currentView.currentDogUrl  = fromPromise(currentDogPromise);
    this.currentView.nextDogUrl     = fromPromise(nextDogPromise);
    this.currentView.previousDogUrl = fromPromise(new Promise((r, reject) => reject(null)));
  }

  @action getBreedList(){
    this.service
      .fetchBreedList()
      .then(res => {
        this.currentView.breedList = res.message;

      }, err => {
        console.log(err);
      });
  }

  @action updateCollection(collection){
    this.doglitStore.collection = collection;

    this.updateDog(new Promise((resolve) => { resolve(this.doglitStore.collection[0]) }))
  }

  @action updateDog(newDogPromise = new Promise((r, reject) => reject(null))){
    this.currentView.currentDogUrl  = fromPromise(newDogPromise);
    this.currentView.nextDogUrl     = fromPromise(this.doglitStore.nextDogUrl(newDogPromise));
    this.currentView.previousDogUrl = fromPromise(this.doglitStore.previousDogUrl(newDogPromise));
  }

  @action nextDog(){
    let lastDogUrl = this.doglitStore.collection[this.doglitStore.collection.length - 1];

    // Set up fetching another random dog if we are at the end of the random stack
    if(!this.currentView.selectedBreed && this.currentView.nextDogUrl.value === lastDogUrl){
      const nextDogPromise = this.service.fetchRandomDog().then(res => res.message);
      this.doglitStore.addDogToCollection(nextDogPromise);
    }

    const newDogPromise = this.doglitStore.nextDogUrl(this.currentView.currentDogUrl);

    this.updateDog(newDogPromise);
  }

  @action previousDog(){
    const newDogPromise = this.doglitStore.previousDogUrl(this.currentView.currentDogUrl);

    this.updateDog(newDogPromise);
  }

  @action updateBreed(breed){
    // TODO - maybe...
    // if(breed && typeof this.cache[breed] !== 'undefined')
    //   // load cached breed
    // else
    //   // load a new breed and save it to cache

    // Update selected breed
    this.currentView.selectedBreed = breed;

    // Go back to random if we've deselected a breed
    if(!this.currentView.selectedBreed)
      return this.initRandom();

    this.fetchBreedInProgress = true;

    // Otherwise fetch the selected breed images
    this.service
      .fetchBreedImages(breed)
      .then(res => {
        this.updateCollection(res.message);
        this.fetchBreedInProgress = false;

      }, err => {
        console.log(err);
        this.fetchBreedInProgress = false;
      });
  }

}

export default ViewStore;
