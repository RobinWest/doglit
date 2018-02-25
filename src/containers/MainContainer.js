var React             = require('react');

var BodyContainer     = require('./BodyContainer');
var SidebarContainer  = require('./SidebarContainer');

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
				<OtherComponent
					prop={this.state.key}
				 />
			</div>
		);
	};
}

module.exports = MainContainer;