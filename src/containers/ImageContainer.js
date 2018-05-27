const React = require('react');

class ImageContainer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: false,
		};
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.src === prevProps.src)
			return;

		this.setState({
			loading: true
		});

		this.fetchImage(this.props.src)
			.then(response => {

				this.setState({
					loading: false,
					src: response.src
				});

			}, error => {
				console.log(error);
			});
	}

	fetchImage(src){
		let image = new Image();

		const promise = new Promise((resolve, reject) => {
			if(!src)
				return reject('No image loaded:', image.src);

			image.onload = event => {
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
		const { loading }  = this.state,
		      { children, loadingProp = 'loading' } = this.props;

		const childrenWithProps = React.Children.map(children, child => 
				React.cloneElement(child, { [loadingProp]: loading })
			);

		return ( childrenWithProps );
	};
}

module.exports = ImageContainer;