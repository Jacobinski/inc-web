import React from 'react';
const {Component} = React;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {content: 'Loading'};
    }

    componentWillMount() {
        fetch('/profile')
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
                <h2>Profile</h2>
                <p>{this.state.content}</p>
            </div>
        );
    }
}