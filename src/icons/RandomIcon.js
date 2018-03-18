var React     = require('react');
var PropTypes = require('prop-types');

class RandomIcon extends React.Component {
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
			<svg className={`icon icon-forward ${this.props.className}`} viewBox={this.props.viewBox} /*width={this.props.width} height={this.props.height}*/ xmlns="http://www.w3.org/2000/svg" aria-labelledby="title">
				<title>forward</title>
				<path d="M27 6h-16c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5v-16c0-2.75-2.25-5-5-5zM13 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM13 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM19 22c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25.899 4c-0.467-2.275-2.491-4-4.899-4h-16c-2.75 0-5 2.25-5 5v16c0 2.408 1.725 4.432 4 4.899v-19.899c0-1.1 0.9-2 2-2h19.899z"></path>

			</svg>
		);
	};
}

module.exports = RandomIcon;