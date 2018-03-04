let React = require('react');
let dogService = require('../services/DogService');

require('../css/components/doglit.less');

let DoglitHeroImage = require('../components/DoglitHeroImage');

class DoglitContainer extends React.Component {
	constructor(){
		super();

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

	render(){
		return (
			<div className="doglit-container">
				<DoglitHeroImage
					imgUrl={ this.state.doglitImageUrl }
				/>
			</div>
		);
	};
}

module.exports = DoglitContainer;