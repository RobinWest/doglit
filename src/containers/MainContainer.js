let React = require('react');

let BreedListContainer = require('./BreedListContainer'),
	DoglitContainer    = require('./DoglitContainer');

class MainContainer extends React.Component {
	constructor(){
		super();

		// this.myProperty = this.myProperty.bind(this);

		this.state = {
		};
	}

	// mySetState(value = 'default'){
	// 	this.setState({
	// 		key: value
	// 	});
	// };

	render(){
		return (
			<div className="main-container">
				<div className="header-container">
					<h1>Doglit</h1>
					<BreedListContainer/>
				</div>

				<DoglitContainer/>
			</div>
		);
	};
}

module.exports = MainContainer;