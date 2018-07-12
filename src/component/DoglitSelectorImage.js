import React from 'react';
import PropTypes from 'prop-types';

import '../css/DoglitSelectorImage.css';

const DoglitSelectorImage = (props) => (
  <div className="DoglitSelectorImage">
    {(props.state === 'pending' || props.state === 'loading') && 
      <p>...</p>
    }
    {props.state === 'complete' && 
      <div className="DoglitSelectorImage__image" style={ {backgroundImage: `url(${props.imageUrl})`} }></div>
    }
  </div>
);

DoglitSelectorImage.propTypes = {
};

export default DoglitSelectorImage;
