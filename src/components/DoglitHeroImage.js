let React = require('react');

const DoglitHeroImage = (props) => {
	return (
		<div className="doglit-hero-image" style={ {backgroundImage: `url(${props.imgUrl})`} }></div>
	);
}

module.exports = DoglitHeroImage;