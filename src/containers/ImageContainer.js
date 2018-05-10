let React = require('react');

class ImageContainer extends React.Component {
	constructor(props){
		super(props);

		console.log(this.props);

		this.state = {
			loading: false,
			// src: this.props.src
		};
	}

	// static getDerivedStateFromProps(nextProps, prevState){
	// 	console.log('getDerivedStateFromProps:');
	// 	console.log(nextProps);
	// 	console.log(prevState);

	// 	let state = null;

	// 	if(prevState.src !== nextProps.src)
	// 		state = { ...nextProps };

	// 	return state;
	// }

	componentDidUpdate(prevProps, prevState){
		console.log(':::::');
		console.log(this.props);
		console.log(this.state);
		console.log(':::::');

		if(this.props.src === prevProps.src)
			return;

		this.setState({
			loading: true
		});

		this.fetchImage(this.props.src)
			.then(response => {
				console.log('resolved!', response);

				this.setState({
					loading: false,
					src: response.src
				});

			}, error => {
				console.log(error);
			});
	}

	fetchImage(src){
		console.log('fetch', src);
		let image = new Image();

		const promise = new Promise((resolve, reject) => {
			if(!src)
				return reject('No image loaded:', image.src);

			image.onload = event => {
				console.log('onLoad:', event, image.src);
				if(event && image.src)
					resolve({e: event, src: image.src});
				else
					reject('Image failed to load:', image.src);
			};
		});

		image.src = src;

		return promise;
	}

	render(){
		let loading = this.state.loading;

		return (!loading ? this.props.children : ( <p>Loading...</p> ));
	};
}

module.exports = ImageContainer;