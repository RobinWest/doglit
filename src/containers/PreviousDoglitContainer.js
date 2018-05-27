const React         = require('react');
const PropTypes     = require('prop-types');
const CSSTransition = require('react-transition-group/CSSTransition');

require('../css/components/doglitSwitch.less');

const DoglitSwitch = require('../components/DoglitSwitch');
const ForwardIcon  = require('../icons/ForwardIcon');
const RandomIcon   = require('../icons/RandomIcon');

class PreviousDoglitContainer extends React.Component {
	constructor(props){
		super(props);

		this.handleClick     = this.handleClick.bind(this);

		this.state = {
			slideIn: false
		};
	}

	handleClick(newIndex){
		this.props.onUpdateSelectedDoglit(newIndex, 'previous');

		this.setState({
			slideIn: true
		});
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
				<CSSTransition
					in={this.state.slideIn}
					timeout={230}
					classNames={{
						exit        : 'slide-in previous',
						exitActive  : 'slide-in-active previous',
						enter       : 'bounce-out previous',
						enterActive : 'bounce-out-active previous'
					}}
					onEntered={() => {
						this.setState({
							slideIn: false
						});
					}}
				>
					{switchComponent}
				</CSSTransition>
			</div>
		);
	};
}

PreviousDoglitContainer.propTypes = {
	selectedDoglitIndex: PropTypes.number,
	selectedBreed: PropTypes.string.isRequired,
	imageCollection: PropTypes.array.isRequired,
	onUpdateSelectedDoglit: PropTypes.func.isRequired,
}


module.exports = PreviousDoglitContainer;