const React     = require('react');
const PropTypes = require('prop-types');

const DoglitSwitch = (WrappedIcon) => (props) => {
	return (
		<div className={`doglit-switch`} style={ {backgroundImage: `url(${props.imageUrl || ''})`} } onClick={ props.onSwitchDoglit }>
			{WrappedIcon && 
				<div className="doglit-switch-icon-badge">
					<WrappedIcon />
				</div>
			}
		</div>
	);
}

DoglitSwitch.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	onSwitchDoglit: PropTypes.func.isRequired,
}

module.exports = DoglitSwitch;