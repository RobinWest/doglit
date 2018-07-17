import React from 'react';
import PropTypes from 'prop-types';

import '../css/DoglitSelectorImage.css';

import BoneIcon from '../icon/BoneIcon';

// For testing animation
// const DoglitSelectorImage = (props) => (
//   <div className={`DoglitSelectorImage DoglitSelectorImage--loading`}>
//       <BoneIcon />
//   </div>
// );

const DoglitSelectorImage = (props) => (
  <div className={`DoglitSelectorImage ${(props.state === 'pending' || props.state === 'loading') ? 'DoglitSelectorImage--loading' : ''}`}>
    {(props.state === 'pending' || props.state === 'loading') && 
      <BoneIcon />
    }
    {props.state === 'complete' && 
      <div className="DoglitSelectorImage__image" style={ {backgroundImage: `url(${props.imageUrl})`} }></div>
    }
  </div>
);

DoglitSelectorImage.propTypes = {
  state: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default DoglitSelectorImage;
