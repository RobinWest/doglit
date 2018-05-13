const React = require('react');

const DoglitSwitch = (WrappedIcon) => (props) => {
	return (
		<div className={`doglit-switch`} style={ {backgroundImage: `url(${props.imageUrl || ''})`} } onClick={props.onSwitchDoglit}>
			{WrappedIcon && 
				<WrappedIcon />
			}
		</div>
	);
}

module.exports = DoglitSwitch;