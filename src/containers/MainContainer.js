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
			this.fetchBreed(this.state.selectedBreed);
	}

	fetchRandomDoglit(){
		return dogService
			.getRandomDog()
			.then(response => {
				let image = response.data.message;

				return image;

			}, err => {
				console.log(err);
			}).then();
	}

	fetchBreed(breed){
		let self = this;

		dogService
			.getBreedImages(breed)
			.then(response => {
				// TODO should this straight up update?
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

	addRandomDoglit(switchToDoglit){
		let doglitPromise = this.fetchRandomDoglit();

		doglitPromise
			.then(response => {
				this.addImageToCollection(response);

				if(switchToDoglit === true)
					this.updateSelectedDoglit(this.state.imageCollection.length - 1);

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
		let previousSwitchComponent,
			nextSwitchComponent;

		if(this.state.imageCollection.length > 1){
			previousSwitchComponent = (
				<DoglitSwitchPrevious
					selectedDoglitIndex={this.state.selectedDoglitIndex}
					selectedBreed={this.state.selectedBreed}
					imageCollection={this.state.imageCollection}
					updateSelectedDoglit={this.updateSelectedDoglit}
				/>
			);
		}

		if(!this.state.selectedBreed && this.state.selectedDoglitIndex >= this.state.imageCollection.length - 1){
			nextSwitchComponent = (
				<DoglitSwitchRandom
					selectedDoglitIndex={this.state.selectedDoglitIndex}
					selectedBreed={this.state.selectedBreed}
					imageCollection={this.state.imageCollection}
					updateSelectedDoglit={this.updateSelectedDoglit}
					onAddRandomDoglit={this.addRandomDoglit}
				/>
			);
		} else {
			nextSwitchComponent = (
				<DoglitSwitchNext
					selectedDoglitIndex={this.state.selectedDoglitIndex}
					selectedBreed={this.state.selectedBreed}
					imageCollection={this.state.imageCollection}
					updateSelectedDoglit={this.updateSelectedDoglit}
				/>
			);
		}

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
					{ previousSwitchComponent }
				</section>
				<section className="next-area">
					{ nextSwitchComponent }
				</section>
			</div>
		);
	};
}

const DoglitSwitchPrevious = DoglitSwitchContainer("previous");
const DoglitSwitchNext     = DoglitSwitchContainer("next");
const DoglitSwitchRandom   = DoglitSwitchContainer("random");

module.exports = MainContainer;