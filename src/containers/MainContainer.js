let React      = require('react');
let dogService = require('../services/DogService');

let BreedListContainer = require('./BreedListContainer'),
	DoglitContainer    = require('./DoglitContainer');

class MainContainer extends React.Component {
	constructor(){
		super();

		this.selectBreed = this.selectBreed.bind(this);

		this.state = {
			selectedBreed: null
		};
	}

	selectBreed(value){
		console.log(value);

		this.setState({
			selectedBreed: value
		});
	}

	// mySetState(value = 'default'){
	// 	this.setState({
	// 		key: value
	// 	});
	// };

	render(){
		return (
			<div className="main-container">
				<section className="main-column">
					<div className="header-container">
						<h1>DOGLIT</h1>
						<hr/>
						<BreedListContainer
							selectedBreed={this.state.selectedBreed}
							onSelectBreed={this.selectBreed}
						/>
					</div>

					<DoglitContainer/>
				</section>
			</div>
		);
	};
}

module.exports = MainContainer;