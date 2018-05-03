let React      = require('react');
let dogService = require('../services/DogService');

let BreedListContainer      = require('./BreedListContainer'),
	DoglitContainer         = require('./DoglitContainer'),
	NextDoglitContainer     = require('./NextDoglitContainer'),
	PreviousDoglitContainer = require('./PreviousDoglitContainer');

class MainContainer extends React.Component {
	constructor(){
		super();

		this.updateSelectedBreed  = this.updateSelectedBreed.bind(this);
		this.updateSelectedDoglit = this.updateSelectedDoglit.bind(this);
		this.addRandomDoglit      = this.addRandomDoglit.bind(this);

		this.state = {
			selectedBreed: null,
			selectedDoglitIndex: null,
			imageCollection: []
		};
	}

	componentDidMount(){
		let self = this;

		this.addRandomDoglit();

		this.updateSelectedDoglit(0);
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.selectedBreed !== this.state.selectedBreed)
			this.fetchAndSetBreed(this.state.selectedBreed);
	}

	fetchRandomDoglit(){
		return dogService
			.getRandomDog()
			.then(response => {
				let image = response.data.message;

				return image;

			}, err => {
				console.log(err);
			});
	}

	fetchAndSetBreed(breed){
		let self = this;

		dogService
			.getBreedImages(breed)
			.then(response => {
				self.updateImageCollection(response.data.message);

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

	addRandomDoglit(){
		let doglitPromise = this.fetchRandomDoglit();

		return doglitPromise
			.then(response => {
				this.addImageToCollection(response);

				return response;
			}, err => {
				console.log(err);
			});
	}

	addImageToCollection(newImage){
		if(!newImage)
			return;

		let imageCollection = this.state.imageCollection;

		imageCollection.push(newImage);

		this.setState({
			imageCollection: imageCollection
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
					{this.state.imageCollection.length > 1 &&
						<PreviousDoglitContainer
							selectedDoglitIndex={this.state.selectedDoglitIndex}
							selectedBreed={this.state.selectedBreed}
							imageCollection={this.state.imageCollection}
							onUpdateSelectedDoglit={this.updateSelectedDoglit}
						/>
					}
				</section>
				<section className="next-area">
					<NextDoglitContainer
						selectedDoglitIndex={this.state.selectedDoglitIndex}
						selectedBreed={this.state.selectedBreed}
						imageCollection={this.state.imageCollection}
						onUpdateSelectedDoglit={this.updateSelectedDoglit}
						onAddRandomDoglit={this.addRandomDoglit}
					/>
				</section>
			</div>
		);
	};
}

module.exports = MainContainer;