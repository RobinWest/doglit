let axios = require('axios');

const apiUrl = '//dog.ceo/api';

const DogService = (props) => {
	return {
		getBreedList: function(){
			return 	axios.get(`${apiUrl}/breeds/list/all`);
		},
		getRandomDog: function(){
			return 	axios.get(`${apiUrl}/breeds/image/random`);
		}
	}
}

module.exports = new DogService();