const React = require('react');
// const dogService = require('../services/DogService');

require('../css/components/doglit.less');

const ImageContainer  = require('./ImageContainer');
const DoglitHeroImage = require('../components/DoglitHeroImage');

class DoglitContainer extends React.Component {
	constructor(){
		super();

		this.state = {
			breedName: '',
			subBreedName: ''
		};
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.selectedDoglitUrl === prevProps.selectedDoglitUrl)
			return;

		let names;

		names = this.getNamesFromUrl(this.props.selectedDoglitUrl);

		this.setState(names);
	}

	getNamesFromUrl(url){
		let el   = document.createElement('a'),
			path = '';

		// Create an element and set it's href so we can rip bits out
		el.href = url;

		path = el.pathname.replace('/breeds/', '');

		let extraction = path.substring(0, path.indexOf('/')),
			nameArray  = extraction.split('-');

		return {breedName: nameArray[0], subBreedName: nameArray[1]};
	}

	render(){
		return (
			<div className="doglit-container">
				<ImageContainer src={ this.props.selectedDoglitUrl }>
					<DoglitHeroImage
						imgUrl={ this.props.selectedDoglitUrl }
					/>
				</ImageContainer>
				<div className="doglit-info">
					<h3>{ this.state.breedName }</h3>
					<h4>{ this.state.subBreedName }</h4>
				</div>
			</div>
		);
	};
}

module.exports = DoglitContainer;