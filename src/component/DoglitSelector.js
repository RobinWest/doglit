import React from 'react';
import PropTypes from 'prop-types';

import ImageLoader from '../container/ImageLoader';
import DoglitSelectorImage from './DoglitSelectorImage';

import '../css/DoglitSelector.css';

const DoglitSelector = (props) => (
  <button className={`DoglitSelector DoglitSelector--${props.type}`} onClick={props.onClick} disabled={props.imageState !== 'fulfilled'}>
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
  </button>
);

DoglitSelector.propTypes = {
  type: PropTypes.string.isRequired,
  imageState: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default DoglitSelector;
