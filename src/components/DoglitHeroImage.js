let React = require('react');

// require('../css/components/sidebar.less');

// var Contact = require('./Contact');

// var CrossIcon     = require('./icons/CrossIcon');

const DoglitHeroImage = (props) => {
	return (
		<div className="doglit-hero-image" style={ {backgroundImage: `url(${props.imgUrl})`} }></div>
	);
}

module.exports = DoglitHeroImage;