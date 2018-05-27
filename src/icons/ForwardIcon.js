const React     = require('react');
const PropTypes = require('prop-types');

class ForwardIcon extends React.Component {
	static defaultProps = {
		width: 32,
		height: 32,
		viewBox: '0 0 32 32'
	};

	render(){
		return (
			<svg className={`icon icon-forward ${this.props.className}`} viewBox={this.props.viewBox} /*width={this.props.width} height={this.props.height}*/ xmlns="http://www.w3.org/2000/svg" aria-labelledby="title">
				<title>forward</title>
				<path d="M8.192 0c-3.554 6.439-4.153 16.259 9.808 15.932v-7.932l12 12-12 12v-7.762c-16.718 0.436-18.58-14.757-9.808-24.238z"></path>
			</svg>
		);
	};
}

ForwardIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	viewBox: PropTypes.string,
	className: PropTypes.string,
}


module.exports = ForwardIcon;