let React = require('react');

require('../css/components/doglitSwitch.less');

let DoglitSwitch = require('../components/DoglitSwitch');
let ForwardIcon  = require('../icons/ForwardIcon');
let BackIcon     = require('../icons/BackIcon');
let RandomIcon   = require('../icons/RandomIcon');

const DoglitSwitchContainer = (mode) => {
	return class DoglitSwitchContainer extends React.Component {
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
			this.props.updateSelectedDoglit(newIndex);
		}

		getRandomDoglit(){
			this.props.onAddRandomDoglit(true);
		}
		getPreviousDoglit(){
			let newIndex = this.props.selectedDoglitIndex - 1,
				length   = this.props.imageCollection.length;

			if(newIndex < 0)
				newIndex = length - 1;

			return newIndex;
		}
		getNextDoglit(){
			let newIndex = this.props.selectedDoglitIndex + 1,
				length   = this.props.imageCollection.length;

			if(newIndex > length - 1)
				newIndex = 0;

			return newIndex;
		}

		render(){
			// TODO k this all seems suitably obtuse - should be separated into own containers I reckon
			let switchComponent;

			const SwitchWithPreviousIcon = DoglitSwitch(BackIcon),
				  SwitchWithNextIcon     = DoglitSwitch(ForwardIcon),
				  SwitchWithRandomIcon   = DoglitSwitch(RandomIcon),
				  EmptyDoglitSwitch      = DoglitSwitch();

			if(mode === 'random'){
				switchComponent = (
					<SwitchWithRandomIcon
						onSwitchDoglit={ () => this.getRandomDoglit() }
					/>
				);
			} else if(mode === 'previous') {
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
						<SwitchWithNextIcon 
							imageUrl={ this.props.imageCollection[previousDoglitIndex] }
							onSwitchDoglit={ () => this.handleClick(previousDoglitIndex) }
						/>
					);
				}
			} else if(mode === 'next') {
				let nextDoglitIndex = this.getNextDoglit();

				// Default
				switchComponent = (
					<EmptyDoglitSwitch 
						imageUrl={ this.props.imageCollection[nextDoglitIndex] }
						onSwitchDoglit={ () => this.handleClick(nextDoglitIndex) }
					/>
				);

				if(nextDoglitIndex < this.props.selectedDoglitIndex){
					switchComponent = (
						<SwitchWithPreviousIcon 
							imageUrl={ this.props.imageCollection[nextDoglitIndex] }
							onSwitchDoglit={ () => this.handleClick(nextDoglitIndex) }
						/>
					);
				}
			}

			return (
				<div className={`doglit-switch-container doglit-switch-${mode}`}>
					{switchComponent}
				</div>
			);
		};
	}
}

module.exports = DoglitSwitchContainer;