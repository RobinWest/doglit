let React = require('react');

const BreedList = (props) => {
	return (
		<div className={`breed-list ${props.loading}`}>

			<select name="breed-select" id="breedSelect" onChange={props.handleChange}>
				<option value="">Choose a breed&hellip;</option>
				{Object.keys(props.breeds).map((breed, index) => {
					return <option key={'skill-' + index} value={breed}>{ breed }</option>;
				}, this)}
			</select>

		</div>
	);
}

module.exports = BreedList;