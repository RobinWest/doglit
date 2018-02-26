var React = require('react');

// var OtherComponent     = require('./OtherComponent');

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
				{/*<OtherComponent
					prop={this.state.key}
				 />*/}
			</div>
		);
	};
}

module.exports = MainContainer;