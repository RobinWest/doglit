let React = require('react');
let DoglitDropdown = require('./DoglitDropdown');


require('react-dropdown/style.css');
require('../css/components/breedList.less');


const BreedList = (props) => {
	return (
		<div className={`breed-list ${props.loading}`}>

			<DoglitDropdown 
				onChange={props.handleChange}
				options={props.breedList}
				value={props.selectedBreed}
				placeholder={props.breedList.length ? `Choose a breed...` : 'Loading...'}
				disabled={props.breedList.length ? false : 'disabled'}
			/>

			{/*<select name="breed-select" id="breedSelect" onChange={props.handleChange}>
				<option value="">Choose a breed&hellip;</option>
				{Object.keys(props.breeds).map((breed, index) => {
					return <option key={'skill-' + index} value={breed}>{ breed }</option>;
				}, this)}
			</select>*/}

		</div>
	);
}

module.exports = BreedList;