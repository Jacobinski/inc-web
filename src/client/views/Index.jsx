import React from "react";

const {Component} = React;

import gainsofthrones from "../../../assets/img/gainsofthrones.png";

export default class Index extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <img src={gainsofthrones} />
                </div>
            </div>
        );
    }
}
