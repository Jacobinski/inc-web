import React from "react";
const {Component} = React;

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {content: 'Loading'};
    }

    componentWillMount() {
        fetch('/feed')
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
                <h2>Feed</h2>
                <p>{this.state.content}</p>
            </div>
        );
    }
}
