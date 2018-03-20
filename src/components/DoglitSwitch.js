let React = require('react');

// TODO this might benefit from having some Higher Order Components
// - previous/next icons
// - random state
const DoglitSwitch = (WrappedIcon) => (props) => {
	return (
		<div className={`doglit-switch`} style={ {backgroundImage: `url(${props.imageUrl})`} } onClick={props.onSwitchDoglit}>
			{WrappedIcon && 
				<WrappedIcon />
			}
		</div>
	);
}

module.exports = DoglitSwitch;