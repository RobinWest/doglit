let React = require('react');
let CSSTransition = require('react-transition-group/CSSTransition');

require('../css/components/doglitSwitch.less');

let DoglitSwitch = require('../components/DoglitSwitch');
let BackIcon     = require('../icons/BackIcon');
let RandomIcon   = require('../icons/RandomIcon');

class NextDoglitContainer extends React.Component {
	constructor(props){
		super(props);

		this.handleClick     = this.handleClick.bind(this);
		this.getRandomDoglit = this.getRandomDoglit.bind(this);

		this.state = {
			bounceOut: false
		};
	}

	static getDerivedStateFromProps(nextProps, prevState){
		console.log('getDerivedStateFromProps:');
		console.log(nextProps.imageCollection.length);
		console.log(nextProps);
		console.log(prevState);

		// return {bounceOut: true};
		return null;
	}

	handleClick(newIndex){
		this.props.onUpdateSelectedDoglit(newIndex);

		this.setState({
			bounceOut: true
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

		// TODO I think I would rather pass in the icon as a prop
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
					in={this.state.bounceOut}
					timeout={5000}
					classNames="example-transition"
					onEntered={() => {
						this.setState({
							bounceOut: false
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