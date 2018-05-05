import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/grid/grid';
import App from './app';
import { HashRouter as Router} from 'react-router-dom';


ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));