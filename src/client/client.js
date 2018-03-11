import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';
import './scss/custom.scss';

const APP_ROOT = document.getElementById('root');

render(
    <App/>,
    APP_ROOT
);
