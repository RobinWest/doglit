const BASE_URL = '//dog.ceo/api';

const fetchRandomDog = async () => {
  return await fetch(`${BASE_URL}/breeds/image/random`).then(res => res.json());
}

const fetchBreedList = async () => {
  return await fetch(`${BASE_URL}/breeds/list/all`).then(res => res.json());
}

const fetchBreedImages = async (breed) => {
  return await fetch(`${BASE_URL}/breed/${breed}/images`).then(res => res.json());
}


export default {
  fetchRandomDog,
  fetchBreedList,
  fetchBreedImages
}