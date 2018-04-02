import React from "react";
import {Navbar, Content} from "./Navigation.jsx";

const {Component} = React;

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Content />
            </div>
        );
    }
}
