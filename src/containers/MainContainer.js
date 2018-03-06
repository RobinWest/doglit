let React      = require('react');
let dogService = require('../services/DogService');

let BreedListContainer = require('./BreedListContainer'),
	DoglitContainer    = require('./DoglitContainer'),
	DoglitSwitch       = require('../components/DoglitSwitch');

class MainContainer extends React.Component {
	constructor(){
		super();

		this.updateSelectedBreed = this.updateSelectedBreed.bind(this);
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
			.getRandomDog()
			.then(response => {
				console.log(response);

				self.updateImageCollection([response.data.message]);

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
		// console.log('imageCollection', data);

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

	onSwitchDoglit(newIndex){
		let length = this.state.imageCollection.length;

		if(newIndex + 1 > length)
			newIndex = 0;

		if(newIndex < 0)
			newIndex = length - 1;

		this.updateSelectedDoglit(newIndex);
	}

	getShiftedIndex(indexShift){
		let newIndex = this.state.selectedDoglitIndex + indexShift,
			length = this.state.imageCollection.length;

		if(newIndex + 1 > length)
			newIndex = 0;

		if(newIndex < 0)
			newIndex = length - 1;

		return newIndex;
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
					<DoglitSwitch
						placeholderImageUrl={this.state.imageCollection[this.getShiftedIndex(-1)]}
						handleSwitchDoglit={() => this.onSwitchDoglit(this.getShiftedIndex(-1))}
					/>
				</section>
				<section className="next-area">
					<DoglitSwitch
						placeholderImageUrl={this.state.imageCollection[this.getShiftedIndex(1)]}
						handleSwitchDoglit={() => this.onSwitchDoglit(this.getShiftedIndex(1))}
					/>
				</section>
			</div>
		);
	};
}

module.exports = MainContainer;