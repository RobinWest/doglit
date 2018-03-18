let React      = require('react');
let dogService = require('../services/DogService');

let BreedListContainer    = require('./BreedListContainer'),
	DoglitContainer       = require('./DoglitContainer'),
	DoglitSwitchContainer = require('./DoglitSwitchContainer');

class MainContainer extends React.Component {
	constructor(){
		super();

		this.updateSelectedBreed  = this.updateSelectedBreed.bind(this);
		this.updateSelectedDoglit = this.updateSelectedDoglit.bind(this);

		this.state = {
			selectedBreed: null,
			selectedDoglitIndex: null,
			imageCollection: []
		};
	}

	componentDidMount(){
		let self = this;

		dogService
			.getRandomDog(3)
			.then(responses => {
				console.log(responses);

				let images = [];

				responses.forEach((response) => {
					images.push(response.data.message);
				});

				self.updateImageCollection(images);

			}, err => {
				console.log(err);
			});
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.selectedBreed !== this.state.selectedBreed)
			this.fetchBreed(this.state.selectedBreed);
	}

	fetchBreed(breed){
		let self = this;

		dogService
			.getBreedImages(breed)
			.then(response => {
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
		this.setState({
			imageCollection: data
		});

		// Select the first image from the collection
		this.updateSelectedDoglit(0);
	}

	updateSelectedDoglit(index){
		this.setState({
			selectedDoglitIndex: index
		});
	}

	render(){
		return (
			<div className="main-container">
				<section className="header-area">
					<div className="header-container">
						<h1>DOGLIT</h1>
						<hr/>
						<BreedListContainer
							selectedBreed={this.state.selectedBreed}
							onSelectBreed={this.updateSelectedBreed}
						/>
					</div>
				</section>
				<section className="doglit-area">
					<DoglitContainer
						selectedDoglitUrl={this.state.imageCollection[this.state.selectedDoglitIndex]}
					/>
				</section>
				<section className="previous-area">
					<DoglitSwitchPrevious
						imageCollection={this.state.imageCollection}
						updateSelectedDoglit={this.updateSelectedDoglit}
						selectedDoglitIndex={this.state.selectedDoglitIndex}
						selectedBreed={this.state.selectedBreed}
					/>
				</section>
				<section className="next-area">
					<DoglitSwitchNext
						imageCollection={this.state.imageCollection}
						updateSelectedDoglit={this.updateSelectedDoglit}
						selectedDoglitIndex={this.state.selectedDoglitIndex}
						selectedBreed={this.state.selectedBreed}
					/>
				</section>
			</div>
		);
	};
}

const DoglitSwitchPrevious = DoglitSwitchContainer("previous");
const DoglitSwitchNext     = DoglitSwitchContainer("next");

module.exports = MainContainer;