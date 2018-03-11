import React from "react";
import Calendar from "react-calendar";

const {Component} = React;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), monthData: [], dayData: [], today: new Date(), error: null, activeDays: []};

        this._selectDate = this._selectDate.bind(this);
    }

    componentWillMount() {
        fetch('/profile')
            .then(response => response.json())
            .then((monthData) => {
                monthData.map((entry) => {
                        let {day, month, year} = entry.date;
                        entry.date = new Date(year, month, day);
                        return entry;
                    }
                );

                let activeDays = [];
                for (let entry of monthData) {
                    activeDays.push(entry.date);
                }

                this.setState({monthData, activeDays});
                console.log(this.state);
            })
            .catch((error) => {
                this.setState({error: 'There was an error.'});
                console.log(error);
            })
    }

    _selectDate(date) {
        this.setState({date});
        this.setState({dayData: []});

        for (let entry of this.state.monthData) {
            if (entry.date.getTime() == date.getTime()) {
                this.setState({dayData: entry.workout});
            }
        }
    }

    render() {
        return (
            <div>
                <h2>Profile</h2>
                <div className="row">
                    <div className="col s12 m6">
                        <Calendar className="calendar"
                                  onChange={this._selectDate}
                                  value={this.state.date}
                                  maxDate={this.state.today}
                                  tileClassName={({date, view}) => {
                                      let time = date.getTime();
                                      if (view === 'month') {
                                          for (let activeDay of this.state.activeDays) {
                                              if (activeDay.getTime() === time) {
                                                  return 'active';
                                              }
                                          }
                                      }
                                  }
                                  }
                        />
                    </div>
                    <div className="col s12 m6">
                        <WorkoutData data={this.state.dayData}/>
                    </div>
                </div>
            </div>
        );
    }
}

class WorkoutData extends Component {
    render() {
        return (
            <div className="scroll-menu">
                {this.props.data.map(
                    (tile, index) => {
                        return (
                            <div key={index} className="scroll-menu-item">
                                <div className="card small">
                                    <div className="card-image">
                                        <img
                                            src="https://2.bp.blogspot.com/-mTfV6tVwLmk/T_cmGXLUfQI/AAAAAAAAXxU/jshgTwx2yPk/s1600/292679045.jpg"/>
                                        <span className="card-title">{tile.exercise}</span>
                                    </div>
                                    <div className="card-content">
                                        Reps: {tile.reps.map(rep => `${rep}, `)}
                                        Weights: {tile.weights.map(weight => `${weight}, `)}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        );
    }
}
