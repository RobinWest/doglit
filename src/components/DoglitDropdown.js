let React = require('react');
import Dropdown from 'react-dropdown';
import classNames from 'classnames';

require('react-dropdown/style.css');

class DoglitDropdown extends Dropdown{
	renderOption (option) {
		const classes = {
			[`${this.props.baseClassName}-option`]: true,
			[option.className]: !!option.className,
			'is-selected': option === this.state.selected
		};

		const optionClass = classNames(classes);

		let value = option.value || option.label || option;
		let label = option.label || option.value || option;
		let img   = option.img || false;

		return (
			<div
				key={value}
				className={optionClass}
				onMouseDown={this.setValue.bind(this, value, label)}
				onClick={this.setValue.bind(this, value, label)}>
				{/*<div className="doglit-option-image" style={ {backgroundImage: `url(${img || ''})`} }></div>*/}
				{label}
			</div>
		)
	}
}

module.exports = DoglitDropdown;