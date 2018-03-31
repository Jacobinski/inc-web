import React from "react";
const {Component} = React;

export default class DefaultMessage extends Component {
    render() {
        return (
            <div className="default-message-wrapper">
                <div className="card default-message">
                    <div className="card-image">
                        <img src="https://i.pinimg.com/originals/bb/a7/29/bba729d8b3f5da12449ab9604ea11cdb.jpg"
                             width="392"
                             height="270"
                             alt="If the bar aint' bending, you just pretending."
                        />
                    </div>
                    {this.props.message ?
                        <div className="card-content">
                            <p>{this.props.message}</p>
                        </div> : null}
                </div>
            </div>
        );
    }
}
