const React     = require('react');
const PropTypes = require('prop-types');

require('react-dropdown/style.css');
require('../css/components/breedList.less');

const BreedList = (props) => {
	return (
		<div className={`breed-list ${props.loading}`}>

			<select name="breed-select" id="breedSelect" onChange={props.handleChange} value={props.selectedBreed}>
				{!props.selectedBreed &&
					<option value="">{props.breedList.length ? `Choose a breed` : `Loading...`}</option>
				}
				{Object.keys(props.breedList).map((index) => {
					return <option key={'skill-' + index} value={props.breedList[index].value}>{ props.breedList[index].label }</option>;
				}, this)}
			</select>

		</div>
	);
}

BreedList.propTypes = {
	loading: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired,
	selectedBreed: PropTypes.string.isRequired,
	breedList: PropTypes.array.isRequired,
}

module.exports = BreedList;