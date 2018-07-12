import React, { Component } from 'react';
// import { observer, inject } from 'mobx-react';

// import './css/App.css';

// import DoglitHero from './component/DoglitHero';

class ImageLoader extends Component {
  constructor(props){
    super(props);

    this.state = {
      state: props.state
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.imageUrl === prevProps.imageUrl)
      return;

    this.setState({
      state: 'loading'
    });

    switch(this.props.state){
      case 'rejected':
        this.setState({
          src: this.props.imageUrl,
          state: this.props.state
        });
        break;

      case 'fulfilled':
        const image = new Image();

        image.onload = event => {
          if(event && image.src){
            this.setState({
              src: image.src,
              state: 'complete'
            });

          }else{
            this.setState({
              src: null,
              state: 'failed'
            });
          }
        }

        image.src = this.props.imageUrl;
        break;
    }

  }

  render() {
    const { state, src } = this.state,
          { children }   = this.props;

    const childrenWithProps = React.Children.map(children, child => 
      React.cloneElement(child, { state: state, imageUrl: src })
    );

    return( childrenWithProps );
  }
}

export default ImageLoader;
