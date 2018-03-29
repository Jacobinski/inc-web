import React from "react";
const {Component} = React;

export class LoadingIcon extends Component {
    render() {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }
}
