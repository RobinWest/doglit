const axios = require('axios');

const apiUrl = '//dog.ceo/api';

const DogService = (props) => {
	return {
		getRandomDog: function(){
			return axios.get(`${apiUrl}/breeds/image/random`);
		},
		getBreedList: function(){
			return axios.get(`${apiUrl}/breeds/list/all`);
		},
		getBreedImages: function(breed){
			return axios.get(`${apiUrl}/breed/${breed}/images`);
		}
	}
}

module.exports = new DogService();