const React         = require('react');
const CSSTransition = require('react-transition-group/CSSTransition');


const DoglitHeroImage = (props) => {
	return (
		<div className="doglit-hero-image">
			<CSSTransition
				in={ !props.loading }
				timeout={400}
				unmountOnExit
				classNames="wipe"
			>
				<img src={ props.imgUrl } alt=""/>
			</CSSTransition>
		</div>
	);
}

module.exports = DoglitHeroImage;