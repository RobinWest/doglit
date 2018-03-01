let React = require('react');

let BreedListContainer = require('./BreedListContainer');

class MainContainer extends React.Component {
	constructor(){
		super();

		// this.myProperty = this.myProperty.bind(this);

		this.state = {
		};
	}

	mySetState(value = 'default'){
		this.setState({
			key: value
		});
	};

	render(){
		return (
			<div className="main-container">
				<h1>Doglit</h1>
				<BreedListContainer
					prop={this.state.key}
				/>
			</div>
		);
	};
}

module.exports = MainContainer;