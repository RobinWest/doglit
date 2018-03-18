let React = require('react');
// let dogService = require('../services/DogService');

require('../css/components/doglit.less');

let DoglitHeroImage = require('../components/DoglitHeroImage');

class DoglitContainer extends React.Component {
	constructor(){
		super();

		// this.state = {
		// 	loading: true,
		// 	doglitImageUrl: ''
		// };
	}

	render(){
		return (
			<div className="doglit-container">
				<DoglitHeroImage
					imgUrl={ this.props.selectedDoglitUrl }
				/>
			</div>
		);
	};
}

module.exports = DoglitContainer;