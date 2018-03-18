let React         = require('react');
let ReactDOM      = require('react-dom');

let MainContainer = require('./containers/MainContainer');

require('./css/main.less');
require('./css/icons.less');

ReactDOM.render(<MainContainer />, document.getElementById('app'));
