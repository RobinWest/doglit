var React         = require('react');
var ReactDOM      = require('react-dom');
var MainContainer = require('./containers/MainContainer');

require('./css/main.less');

ReactDOM.render(<MainContainer />, document.getElementById('app'));
