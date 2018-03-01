let React = require('react');
let dogService = require('../services/DogService');

// let BreedList = require('../components/BreedList');

class DoglitContainer extends React.Component {
	constructor(){
		super();

		// this.setBreedData = this.setBreedData.bind(this);

		this.state = {
			loading: true,
			doglitImageUrl: ''
		};
	}

	componentDidMount(){
		this.getRandomDoglit();
	}

	getRandomDoglit(){
		let self = this;

		dogService
			.getRandomDog()
			.then(response => {
				console.log(response);

				self.setDoglit(response.data.message);

			}, err => {
				console.log(err);
			});
	}

	setDoglit(data){
		console.log('setDoglit:', data);

		this.setState({
			doglitImageUrl: data
		});
	};

	// onSelectBreed(e){
	// 	console.log(e);
	// 	let element = e.target,
	// 		value   = element.value;

	// 	console.log(value);
	// 	this.setState({
	// 		selectedBreed: value
	// 	});
	// }

	render(){
		return (
			<div className="doglit-container">
				<h2>Doglit Container</h2>
				<img src={ this.state.doglitImageUrl } alt="Doglit" />
			</div>
		);
	};
}

module.exports = DoglitContainer;