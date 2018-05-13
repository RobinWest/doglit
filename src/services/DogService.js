const axios = require('axios');

const apiUrl = '//dog.ceo/api';

const DogService = (props) => {
	return {
		getRandomDog: function(count){
			if(!count || count <= 1)
				return axios.get(`${apiUrl}/breeds/image/random`);

			let promises = [];

			for(let i = 0; i < count; i++){
				promises.push(axios.get(`${apiUrl}/breeds/image/random`));
			}

			return axios.all(promises);
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