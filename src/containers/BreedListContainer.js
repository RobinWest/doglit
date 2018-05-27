const React      = require('react');
const PropTypes  = require('prop-types');
const dogService = require('../services/DogService');

const BreedList = require('../components/BreedList');

class BreedListContainer extends React.Component {
	constructor(props){
		super(props);

		this.onSelectBreed = this.onSelectBreed.bind(this);

		this.state = {
			loading: true,
			breedList: []
		};
	}

	componentDidMount(){
		let self = this;

		dogService
			.getBreedList()
			.then(response => {
				self.setBreedData(response.data.message);

			}, err => {
				console.log(err);
			});
	}

	setBreedData(data){
		let breedList = this.buildBreedList(data);

		this.setState({
			breedList: breedList
		});
	};

	buildBreedList(data){
		let breedList = [];

		for(var breed in data){
			// TODO add groups for sub-breeds
			breedList.push({
				value: breed,
				label: breed,
			});
		}

		return breedList;
	}

	onSelectBreed(event){
		this.props.onSelectBreed(event.target.value);
	}

	render(){
		return (
			<div className="breed-list-container">
				<BreedList
					loading={this.state.loading}
					breedList={this.state.breedList}
					selectedBreed={this.props.selectedBreed}
					handleChange={this.onSelectBreed}
				/>
			</div>
		);
	};
}

BreedListContainer.propTypes = {
	onSelectBreed: PropTypes.func.isRequired,
	selectedBreed: PropTypes.string.isRequired,
};

module.exports = BreedListContainer;