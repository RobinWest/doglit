let React = require('react');
// let dogService = require('../services/DogService');

require('../css/components/doglit.less');

let DoglitHeroImage = require('../components/DoglitHeroImage');

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

		console.log('names', names);

		this.setState(names);
	}

	getNamesFromUrl(url){
		let el   = document.createElement('a'),
			path = '';

		// Create an element and set it's href so we can rip bits out
		el.href = url;

		path = el.pathname.replace('/api/img/', '');

		let extraction = path.substring(0, path.indexOf('/')),
			nameArray  = extraction.split('-');

		console.log('nameArray', nameArray);

		return {breedName: nameArray[0], subBreedName: nameArray[1]};
	}

	render(){
		return (
			<div className="doglit-container">
				<DoglitHeroImage
					imgUrl={ this.props.selectedDoglitUrl }
				/>
				<div className="doglit-info">
					<h3>{ this.state.breedName }</h3>
					<h4>{ this.state.subBreedName }</h4>
				</div>
			</div>
		);
	};
}

module.exports = DoglitContainer;