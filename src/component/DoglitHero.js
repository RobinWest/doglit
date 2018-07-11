import React from 'react';
import PropTypes from 'prop-types';

import '../css/DoglitHero.css';


const DoglitHero = (props) => (
  <div className="DoglitHero">
    <div className="DoglitHero__image-container">
      {(props.state === 'pending' || props.state === 'loading') && 
        <div className="DoglitHero__loading">
          <p>Loading...</p>
        </div>
      }
      {props.state === 'complete' && 
        <div className="DoglitHero__image" style={ {backgroundImage: `url(${props.imageUrl})`} }></div>
      }
    </div>
    <div className="DoglitHero__title-container">
      <div className="DoglitHero__title">
        <h3>German</h3>
        <h4>Shepherd</h4>
      </div>
    </div>
  </div>
);

DoglitHero.propTypes = {
};

export default DoglitHero;
