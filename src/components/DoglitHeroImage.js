const React         = require('react');
const CSSTransition = require('react-transition-group/CSSTransition');

const DoglitHeroImage = (props) => {
	return (
		<div className="doglit-hero-image">
			<CSSTransition
				in={ !props.loading }
				timeout={400}
				unmountOnExit
				classNames={{
					enter: 'wipe-enter',
					enterActive: 'wipe-enter-active',
					exit: 'fade-exit',
					exitActive: 'fade-exit-active',
				}}
			>
				<img src={ props.imgUrl } alt=""/>
			</CSSTransition>
		</div>
	);
}

module.exports = DoglitHeroImage;