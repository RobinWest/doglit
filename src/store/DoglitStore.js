import { observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

export class DoglitStore {
  @observable collection    = [];
  @observable addInProgress = false;
  @observable addPromise    = null;

  constructor(service){
    this.service = service;
  }

  @computed get length(){
    return this.collection.length;
  }

  @action nextDogUrl(currentDogPromise){
    return new Promise((resolve, reject) => {
      let addDogPromise = new Promise(resolve => resolve());

      if(this.addInProgress)
        addDogPromise = this.addPromise;

      Promise
        .all([currentDogPromise, addDogPromise])
        .then(res => {
          console.log(res);
          let nextIndex = this.collection.indexOf(res[0]);

          if(nextIndex === -1)
            reject('Invalid current doglit.');

          nextIndex = this.getNextIndex(nextIndex);

          resolve(this.collection[nextIndex]);

        }, err => {
          console.log(err);
          reject(err);
        });

      // currentDogPromise
      //   .then(res => {
      //     let nextIndex = this.collection.indexOf(res);

      //     if(nextIndex === -1)
      //       reject('Invalid current doglit.');

      //     nextIndex = this.getNextIndex(nextIndex);

      //     resolve(this.collection[nextIndex]);
      //   }, err => {
      //     reject(err);
      //   });
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

  @action addDogToCollection(newDogPromise = new Promise((r, reject) => reject(null))){
    this.addInProgress = true;
    this.addPromise = newDogPromise;

    newDogPromise
      .then(res => {
        this.collection.push(res);

        this.addPromise    = null;
        this.addInProgress = false;
      });
  }

  @action getNextIndex(index){
    index++;

    return index % this.collection.length;
  }

  @action getPreviousIndex(index){
    index--;

    if(index < 0)
      index = (this.collection.length - 1);

    return index;
  }
}

export default DoglitStore;
