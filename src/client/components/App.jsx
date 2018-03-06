import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Navbar, Content} from "./Navigation.jsx";

const {Component} = React;

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar />
                    <Content />
                </div>
            </Router>
        );
    }
}
