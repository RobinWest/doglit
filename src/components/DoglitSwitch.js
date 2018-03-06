let React = require('react');

require('../css/components/doglitSwitch.less');

const DoglitSwitch = (props) => {
	return (
		<div className="doglit-switch-container">
			<div className="doglit-switch" style={ {backgroundImage: `url(${props.placeholderImageUrl})`} } onClick={props.handleSwitchDoglit}></div>
		</div>
	);
}

module.exports = DoglitSwitch;