const React     = require('react');
const PropTypes = require('prop-types');

class BackIcon extends React.Component {
	static defaultProps = {
		width: 32,
		height: 32,
		viewBox: '0 0 32 32'
	};

	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		viewBox: PropTypes.string
	};

	render(){
		return (
			<svg className={`icon icon-back ${this.props.className}`} viewBox={this.props.viewBox} /*width={this.props.width} height={this.props.height}*/ xmlns="http://www.w3.org/2000/svg" aria-labelledby="title">
				<title>back</title>
				<path d="M14 24.238v7.762l-12-12 12-12v7.932c13.961 0.327 13.362-9.493 9.808-15.932 8.772 9.482 6.909 24.674-9.808 24.238z"></path>
			</svg>
		);
	};
}

module.exports = BackIcon;