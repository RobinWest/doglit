let axios = require('axios');

const apiUrl = '//dog.ceo/api';

const DogService = (props) => {
	return {
		getBreeds: function(){
			return 	axios.get(`${apiUrl}/breeds/list/all`);
		}
	}
}

module.exports = new DogService();