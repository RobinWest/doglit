let React = require('react');
let dogService = require('../services/DogService');

let BreedList = require('../components/BreedList');

class BreedListContainer extends React.Component {
	constructor(){
		super();

		this.setBreedData = this.setBreedData.bind(this);

		this.state = {
			loading: true,
			breeds: {}
		};
	}

	componentDidMount(){
		let self = this;

		dogService
			.getBreeds()
			.then(function resolve(response){
				console.log(response);

				self.setBreedData(response.data.message);

			}, function reject(err){
				console.log(err);
			});
	}

	setBreedData(data){
		console.log('setBreedData:', data);

		this.setState({
			breeds: data
		});
	};

	render(){
		return (
			<div className="breed-list-container">
				<h2>Breed list</h2>
				<BreedList
					loading={this.state.loading}
					breeds={this.state.breeds}
				/>
			</div>
		);
	};
}

module.exports = BreedListContainer;