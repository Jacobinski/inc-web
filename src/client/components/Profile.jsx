import React from "react";
import Calendar from "react-calendar";
const {Component} = React;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), content: 'Loading'};

        this._selectDate = this._selectDate.bind(this);
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

    _selectDate(date) {
        this.setState({date});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h2>Profile</h2>
                <p>{this.state.content}</p>
                <Calendar onChange={this._selectDate} value={this.state.date}/>
            </div>
        );
    }
}