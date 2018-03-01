let React = require('react');

// require('../css/components/sidebar.less');

// var Contact = require('./Contact');

// var CrossIcon     = require('./icons/CrossIcon');

const BreedList = (props) => {
	return (
		<div className={`breed-list ${props.loading}`}>

			<select name="breed-select" id="" onChange={props.handleChange}>
				<option value="">Choose a breed&hellip;</option>
				{Object.keys(props.breeds).map((breed, index) => {
					return <option key={'skill-' + index} value={breed}>{ breed }</option>;
				}, this)}
			</select>

		</div>
	);
}

module.exports = BreedList;