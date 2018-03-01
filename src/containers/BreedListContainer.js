let React = require('react');
let dogService = require('../services/DogService');

let BreedList = require('../components/BreedList');

class BreedListContainer extends React.Component {
	constructor(){
		super();

		this.setBreedData = this.setBreedData.bind(this);

		this.state = {
			loading: true,
			breeds: {},
			selectedBreed: null
		};
	}

	componentDidMount(){
		let self = this;

		dogService
			.getBreedList()
			.then(response => {
				console.log(response);

				self.setBreedData(response.data.message);

			}, err => {
				console.log(err);
			});
	}

	setBreedData(data){
		console.log('setBreedData:', data);

		this.setState({
			breeds: data
		});
	};

	onSelectBreed(e){
		console.log(e);
		let element = e.target,
			value   = element.value;

		console.log(value);
		this.setState({
			selectedBreed: value
		});
	}

	render(){
		return (
			<div className="breed-list-container">
				<h2>Breed list</h2>
				<BreedList
					loading={this.state.loading}
					breeds={this.state.breeds}
					handleChange={this.onSelectBreed}
				/>
			</div>
		);
	};
}

module.exports = BreedListContainer;