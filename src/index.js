let React         = require('react');
let ReactDOM      = require('react-dom');

let MainContainer = require('./containers/MainContainer');

require('./css/main.less');

ReactDOM.render(<MainContainer />, document.getElementById('app'));
