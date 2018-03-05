let React      = require('react');
let dogService = require('../services/DogService');

let BreedListContainer = require('./BreedListContainer'),
	DoglitContainer    = require('./DoglitContainer');

class MainContainer extends React.Component {
	constructor(){
		super();

		this.updateSelectedBreed = this.updateSelectedBreed.bind(this);

		this.state = {
			selectedBreed: null,
			selectedDoglit: null,
			imageCollection: []
		};
	}

	componentDidMount(){
		let self = this;

		dogService
			.getRandomDog()
			.then(response => {
				console.log(response);

				self.updateImageCollection([response.data.message]);

			}, err => {
				console.log(err);
			});
	}

	componentDidUpdate(prevProps, prevState){
		console.log('componentDidUpdate', prevState);

		if(prevState.selectedBreed !== this.state.selectedBreed)
			this.fetchBreed(this.state.selectedBreed);
	}

	fetchBreed(breed){
		let self = this;

		dogService
			.getBreedImages(breed)
			.then(response => {
				console.log(response);
				self.updateImageCollection(response.data.message)

			}, err => {
				console.log(err);
			});
	}

	updateSelectedBreed(value){
		this.setState({
			selectedBreed: value
		});
	}

	updateImageCollection(data){
		console.log('imageCollection', data);

		this.setState({
			imageCollection: data
		});

		// Select the first image from the collection
		this.updateSelectedDoglit(0);
	}

	updateSelectedDoglit(index){
		this.setState({
			selectedDoglit: index
		});
	}

	// mySetState(value = 'default'){
	// 	this.setState({
	// 		key: value
	// 	});
	// };

	render(){
		return (
			<div className="main-container">
				<section className="main-column">
					<div className="header-container">
						<h1>DOGLIT</h1>
						<hr/>
						<BreedListContainer
							selectedBreed={this.state.selectedBreed}
							onSelectBreed={this.updateSelectedBreed}
						/>
					</div>

					<DoglitContainer
						selectedDoglitUrl={this.state.imageCollection[this.state.selectedDoglit]}
					/>
				</section>
			</div>
		);
	};
}

module.exports = MainContainer;