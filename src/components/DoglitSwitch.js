let React = require('react');

// TODO this might benefit from having some Higher Order Components
// - previous/next icons
// - random state
const DoglitSwitch = (WrappedIcon) => (props) => {
	return (
		<div className={`doglit-switch`} style={ {backgroundImage: `url(${props.imageUrl})`} } onClick={props.onSwitchDoglit}>
			{props.switchMode === 'previous' &&
				<span>&lt;--</span>
			}
			{props.switchMode === 'next' &&
				<span>--&gt;</span>
			}

			{WrappedIcon && 
				<WrappedIcon />
			}
		</div>
	);
}

module.exports = DoglitSwitch;