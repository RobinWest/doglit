let React      = require('react');
let dogService = require('../services/DogService');

let BreedList = require('../components/BreedList');

class BreedListContainer extends React.Component {
	constructor(props){
		super(props);

		this.onSelectBreed = this.onSelectBreed.bind(this);

		this.state = {
			loading: true,
			breeds: {}
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
		this.setState({
			breeds: data
		});
	};

	onSelectBreed(e){
		let element = e.target,
			value   = element.value;

		this.props.onSelectBreed(value);
	}

	render(){
		return (
			<div className="breed-list-container">
				<BreedList
					loading={this.state.loading}
					breeds={this.state.breeds}
					selectedBreed={this.props.selectedBreed}
					handleChange={this.onSelectBreed}
				/>
			</div>
		);
	};
}

module.exports = BreedListContainer;