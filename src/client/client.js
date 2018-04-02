import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./components/App.jsx";
import "./scss/custom.scss";

const APP_ROOT = document.getElementById('root');

render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    APP_ROOT
);
