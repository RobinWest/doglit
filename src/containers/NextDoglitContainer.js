let React = require('react');

require('../css/components/doglitSwitch.less');

let DoglitSwitch = require('../components/DoglitSwitch');
let BackIcon     = require('../icons/BackIcon');
let RandomIcon   = require('../icons/RandomIcon');

class NextDoglitContainer extends React.Component {
	constructor(props){
		super(props);

		this.handleClick     = this.handleClick.bind(this);
		this.getRandomDoglit = this.getRandomDoglit.bind(this);

		// this.state = {
		// 	loading: true,
		// 	doglitImageUrl: ''
		// };
	}

	handleClick(newIndex){
		this.props.onUpdateSelectedDoglit(newIndex);
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
				{switchComponent}
			</div>
		);
	};
}

module.exports = NextDoglitContainer;