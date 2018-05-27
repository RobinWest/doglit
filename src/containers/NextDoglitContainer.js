const React         = require('react');
const CSSTransition = require('react-transition-group/CSSTransition');

require('../css/components/doglitSwitch.less');

const DoglitSwitch = require('../components/DoglitSwitch');
const BackIcon     = require('../icons/BackIcon');
const RandomIcon   = require('../icons/RandomIcon');

class NextDoglitContainer extends React.Component {
	constructor(props){
		super(props);

		this.handleClick     = this.handleClick.bind(this);
		this.getRandomDoglit = this.getRandomDoglit.bind(this);

		this.state = {
			slideIn: false
		};
	}

	static getDerivedStateFromProps(nextProps, prevState){
		return null;
	}

	handleClick(newIndex){
		this.props.onUpdateSelectedDoglit(newIndex, 'next');

		this.setState({
			slideIn: true
		});
	}

	getRandomDoglit(){
		this.props.onAddRandomDoglit()
			.then(response => {
				let newIndex = this.getNextDoglitIndex();

				this.handleClick(newIndex);
			});
	}

	getNextDoglitIndex(){
		let newIndex = this.props.selectedDoglitIndex + 1,
			length   = this.props.imageCollection.length;

		if(newIndex > length - 1)
			newIndex = 0;

		return newIndex;
	}

	render(){
		let switchComponent;

		const SwitchWithBackIcon   = DoglitSwitch(BackIcon),
			  SwitchWithRandomIcon = DoglitSwitch(RandomIcon),
			  EmptyDoglitSwitch    = DoglitSwitch();

		if(!this.props.selectedBreed && this.props.selectedDoglitIndex >= this.props.imageCollection.length - 1){
			switchComponent = (
				<SwitchWithRandomIcon
					onSwitchDoglit={ () => this.getRandomDoglit() }
				/>
			);
		} else {
			let nextDoglitIndex = this.getNextDoglitIndex();

			// Default
			switchComponent = (
				<EmptyDoglitSwitch 
					imageUrl={ this.props.imageCollection[nextDoglitIndex] }
					onSwitchDoglit={ () => this.handleClick(nextDoglitIndex) }
				/>
			);

			if(nextDoglitIndex < this.props.selectedDoglitIndex){
				switchComponent = (
					<SwitchWithBackIcon 
						imageUrl={ this.props.imageCollection[nextDoglitIndex] }
						onSwitchDoglit={ () => this.handleClick(nextDoglitIndex) }
					/>
				);
			}
		}

		return (
			<div className={`doglit-switch-container doglit-switch-next`}>
				<CSSTransition
					in={this.state.slideIn}
					timeout={230}
					classNames={{
						exit        : 'slide-in next',
						exitActive  : 'slide-in-active next',
						enter       : 'bounce-out next',
						enterActive : 'bounce-out-active next'
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

module.exports = NextDoglitContainer;