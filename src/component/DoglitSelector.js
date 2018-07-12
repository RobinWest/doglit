import React from 'react';
import PropTypes from 'prop-types';

import ImageLoader from '../container/ImageLoader';
import DoglitSelectorImage from './DoglitSelectorImage';

import '../css/DoglitSelector.css';

const DoglitSelector = (props) => (
  <div className={`DoglitSelector DoglitSelector--${props.type}`} onClick={props.onClick}>
    <div className="DoglitSelector__image-container">
      <div className="DoglitSelector__image">
        <ImageLoader state={props.imageState} imageUrl={props.imageUrl}>
          <DoglitSelectorImage />
        </ImageLoader>
      </div>
    </div>
    <div className="DoglitSelector__label-container">
      <span className="DoglitSelector__label">{props.type}</span>
    </div>
  </div>
);

DoglitSelector.propTypes = {
  type: PropTypes.string.isRequired
};

export default DoglitSelector;
