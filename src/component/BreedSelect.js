import React from 'react';
import PropTypes from 'prop-types';

import '../css/BreedSelect.css';

import DownArrowIcon from '../icon/DownArrowIcon';

const BreedSelect = (props) => (
  <div className="BreedSelect">
    <label htmlFor="BreedSelect">
      <DownArrowIcon />

      <select name="BreedSelect" id="BreedSelect" value={props.value} onChange={props.onSelectBreed} disabled={props.loading}>
        <option value="">{props.loading ? 'Loading...' : 'Select a breed...'}</option>
        {props.options && Object.keys(props.options).map(breedName => 
          (<option key={breedName} value={breedName}>{breedName}</option>)
        )}
      </select>
    </label>
  </div>
);

BreedSelect.propTypes = {
  options: PropTypes.object,
  value: PropTypes.string,
  loading: PropTypes.bool,
  onSelectBreed: PropTypes.func.isRequired,
};

export default BreedSelect;
