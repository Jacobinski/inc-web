import React from "react";
import "whatwg-fetch";
const {Component} = React;

export default class Planner extends Component {
    constructor(props) {
        super(props);
        this.state = {content: 'Loading'};
    }

    componentWillMount() {
        fetch('/planner')
            .then(response => response.text())
            .then((data) => {
                this.setState({content: data});
            })
            .catch((error) => {
                console.log(error);
                this.setState({content: 'There was an error.'})
            })
    }

    render() {
        return (
            <div>
                <h2>Planner</h2>
                <p>{this.state.content}</p>
            </div>
        );
    }
}
