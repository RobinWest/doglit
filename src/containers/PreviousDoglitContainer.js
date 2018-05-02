let React = require('react');

require('../css/components/doglitSwitch.less');

let DoglitSwitch = require('../components/DoglitSwitch');
let ForwardIcon  = require('../icons/ForwardIcon');
let RandomIcon   = require('../icons/RandomIcon');

class PreviousDoglitContainer extends React.Component {
	constructor(props){
		super(props);

		this.handleClick     = this.handleClick.bind(this);

		// this.state = {
		// 	loading: true,
		// 	doglitImageUrl: ''
		// };
	}

	handleClick(newIndex){
		this.props.onUpdateSelectedDoglit(newIndex);
	}

	getPreviousDoglit(){
		let newIndex = this.props.selectedDoglitIndex - 1,
			length   = this.props.imageCollection.length;

		if(newIndex < 0)
			newIndex = length - 1;

		return newIndex;
	}

	render(){
		let switchComponent;

		const SwitchWithForwardIcon = DoglitSwitch(ForwardIcon),
			  EmptyDoglitSwitch     = DoglitSwitch();

		let previousDoglitIndex = this.getPreviousDoglit();

		// Default
		switchComponent = (
			<EmptyDoglitSwitch 
				imageUrl={ this.props.imageCollection[previousDoglitIndex] }
				onSwitchDoglit={ () => this.handleClick(previousDoglitIndex) }
			/>
		);

		if(previousDoglitIndex > this.props.selectedDoglitIndex){
			switchComponent = (
				<SwitchWithForwardIcon 
					imageUrl={ this.props.imageCollection[previousDoglitIndex] }
					onSwitchDoglit={ () => this.handleClick(previousDoglitIndex) }
				/>
			);
		}

		return (
			<div className={`doglit-switch-container doglit-switch-previous`}>
				{switchComponent}
			</div>
		);
	};
}

module.exports = PreviousDoglitContainer;