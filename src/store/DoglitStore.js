import { observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

export class DoglitStore {
  @observable collection = [];
  @observable breed      = null;
  @observable subBreed   = null;

  constructor(service){
    this.service = service;

    // TODO reaction on breed change
  }

  @action nextDogUrl(currentDogPromise){
    return new Promise((resolve, reject) => {
      currentDogPromise
        .then(res => {
          let nextIndex = this.collection.indexOf(res);

          if(nextIndex === -1)
            reject('Invalid current doglit.');

          nextIndex = this.getNextIndex(nextIndex);

          resolve(this.collection[nextIndex]);
        }, err => {
          reject(err);
        });
    });
  }

  @action previousDogUrl(currentDogPromise){
    return new Promise((resolve, reject) => {
      currentDogPromise
        .then(res => {
          let previousIndex = this.collection.indexOf(res);

          if(previousIndex === -1)
            reject('Invalid current doglit.');

          previousIndex = this.getPreviousIndex(previousIndex);

          resolve(this.collection[previousIndex]);
        }, err => {
          reject(err);
        });
    });
  }

  @action getNextIndex(index){
    return index % this.collection.length;
  }

  @action getPreviousIndex(index){
    let newIndex = index - 1;

    if(newIndex < 0)
      newIndex = 0;

    return newIndex;
  }
}

export default DoglitStore;
