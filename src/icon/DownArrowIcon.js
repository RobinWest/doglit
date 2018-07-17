const React     = require('react');
const PropTypes = require('prop-types');

const DownArrowIcon = ({viewBox = '0 0 24 24', className = ''}) => (
  <svg className={`icon icon-down-arrow ${className}`} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-labelledby="title">
    <title>down-arrow</title>
    <path d="M21.6568542,6.34314575 C22.5941125,7.28040405 22.5941125,8.8 21.6568542,9.7372583 L13.7372583,17.6568542 C12.8,18.5941125 11.2804041,18.5941125 10.3431458,17.6568542 C9.40588745,16.7195959 9.40588745,15.2 10.3431458,14.2627417 L18.2627417,6.34314575 C19.2,5.40588745 20.7195959,5.40588745 21.6568542,6.34314575 Z"></path>
    <path d="M2.34314575,6.34314575 C3.28040405,5.40588745 4.8,5.40588745 5.7372583,6.34314575 L13.6568542,14.2627417 C14.5941125,15.2 14.5941125,16.7195959 13.6568542,17.6568542 C12.7195959,18.5941125 11.2,18.5941125 10.2627417,17.6568542 L2.34314575,9.7372583 C1.40588745,8.8 1.40588745,7.28040405 2.34314575,6.34314575 Z"></path>
  </svg>
);

DownArrowIcon.propTypes = {
  viewBox: PropTypes.string,
  className: PropTypes.string,
}

export default DownArrowIcon;