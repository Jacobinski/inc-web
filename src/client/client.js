import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';
import io from 'socket.io';
import './scss/custom.scss';

const APP_ROOT = document.getElementById('root');
const socket = io.connect('http://localhost');

render(
    <App/>,
    APP_ROOT
);
