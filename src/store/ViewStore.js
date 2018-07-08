import { observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

export class ViewStore {
  @observable currentView = null;

  constructor(service, store){
    this.service     = service;
    this.doglitStore = store;
  }

  @action showDog(breed = null){
    this.currentView = {
      selectedBreed: breed,
      currentDogIndex: doglitStore.nextDog(),
      nextDogIndex: doglitStore.nextDog(),
      previousDogIndex: doglitStore.previousDog()
    };
  }
}

export default ViewStore;
