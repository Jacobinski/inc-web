import React from 'react';
const {Component} = React;

export default class Leaderboards extends Component {
    constructor(props) {
        super(props);
        this.state = {content: 'Loading'};
    }

    render() {
        return (
            <div>
                <h2>Leaderboards</h2>
            </div>
        );
    }
}
