import React from "react";
import Calendar from "react-calendar";
import Chart from "chart.js";
import {EXERCISE_TYPES, EXERCISE_IMG} from "../constants";

const {Component} = React;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), monthData: [], dayData: [], today: new Date(), error: null, activeDays: []};

        this._selectDate = this._selectDate.bind(this);
        this.TILE_CLASS_NAME = 'gym-day';
    }

    componentWillMount() {
        fetch('/profile')
            .then(response => response.json())
            .then((jsonData) => {
                let {username, data} = jsonData;
                data = data.map((entry) => {
                        let {day, month, year} = entry.date;
                        entry.date = new Date(year, month, day);
                        return entry;
                    }
                );

                let activeDays = [];
                for (let entry of data) {
                    activeDays.push(entry.date);
                }

                this.setState({monthData: data, activeDays, username});
            })
            .catch((error) => {
                this.setState({error: 'There was an error.'});
                console.log(error);
            })
    }

    _selectDate(date) {
        this.setState({date, dayData: []});

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
                <div className="row eq-col-container">
                    <div className="col eq-col s12 m6">
                        <Calendar className="calendar"
                                  onChange={this._selectDate}
                                  value={this.state.date}
                                  maxDate={this.state.today}
                                  tileClassName={({date, view}) => {
                                      let day = date.getDate();
                                      let month = date.getMonth();
                                      let year = date.getYear();

                                      switch (view) {
                                          case 'month':
                                              for (let activeDay of this.state.activeDays) {
                                                  if (day === activeDay.getDate() && month === activeDay.getMonth()) {
                                                      return this.TILE_CLASS_NAME;
                                                  }
                                              }
                                              break;
                                          case 'year':
                                              for (let activeDay of this.state.activeDays) {
                                                  if (month === activeDay.getMonth() && year === activeDay.getYear()) {
                                                      return this.TILE_CLASS_NAME;
                                                  }
                                              }
                                              break;
                                          case 'decade':
                                              for (let activeDay of this.state.activeDays) {
                                                  if (year === activeDay.getYear()) {
                                                      return this.TILE_CLASS_NAME;
                                                  }
                                              }
                                      }
                                  }}/>
                    </div>
                    <div className="col eq-col s12 m6">
                        <div className="scroll-menu">
                            {this.state.dayData.length > 0 ? this.state.dayData.map(
                                    (exercise, index) => {
                                        return (
                                            <WorkoutData key={index}
                                                         index={index}
                                                         username={this.state.username}
                                                         reps={exercise.reps}
                                                         weights={exercise.weights}
                                                         name={EXERCISE_TYPES[exercise.exerciseID]}
                                                         exerciseID={exercise.exerciseID}/>
                                        )
                                    }
                                ) : <DefaultMessage/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class DefaultMessage extends Component {
    render() {
        return (
            <div className="card default-message">
                <div className="card-content">
                            <span className="card-title">
                                If the bar ain't bending <br/>
                                You just pretending
                            </span>
                    <ul>
                        <li>Your completed workouts will show here.</li>
                        <li>Days where you worked out are highlighted.</li>
                    </ul>
                </div>
            </div>
        );
    }
}

class WorkoutData extends Component {
    static _toggleClass(index) {
        document.querySelector(`#toggle-node-${index}`).classList.toggle('flip');
    }

    constructor(props) {
        super(props);

        WorkoutData._toggleClass = WorkoutData._toggleClass.bind(this);
    }

    componentDidUpdate() {
        document.querySelector(`#toggle-node-${this.props.index}`).classList.remove('flip');
    }

    render() {
        return (
            <div key={this.props.index} className="scroll-menu-item">
                <div id={`toggle-node-${this.props.index}`}
                     ref="flip"
                     className="flip-container">

                    <div className="flipper">

                        <div className="front">
                            <div className="card small">
                                <div className="card-content">
                                    <span className="card-title">{this.props.name}</span>
                                    <Graph key={this.props.index}
                                           id={`graph-${this.props.index}`}
                                           reps={this.props.reps}
                                           weights={this.props.weights}/>
                                    <a onClick={(e) => WorkoutData._toggleClass(this.props.index, e)}
                                       className="btn-floating halfway-fab red">
                                        <i className="material-icons">flip_to_back</i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="back">
                            <div className="card small">
                                <div className="card-content">
                                    <div className="card-image">
                                        <img src={EXERCISE_IMG[this.props.exerciseID]}/>
                                        <span className="card-title">{this.props.name}</span>
                                    </div>
                                    <a onClick={(e) => WorkoutData._toggleClass(this.props.index, e)}
                                       className="btn-floating halfway-fab red">
                                        <i className="material-icons">flip_to_front</i>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

class Graph extends Component {
    static _getLabels(weights) {
        return weights.map(weight => `${weight.toString()} lbs`);
    }

    _instantiateGraph() {
        let ctx = document.getElementById(this.props.id).getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: Graph._getLabels(this.props.weights),
                datasets: [{
                    label: '# of reps',
                    data: this.props.reps
                }]
            }
        });
    }

    componentDidMount() {
        this._instantiateGraph();
    }

    componentDidUpdate() {
        this.chart.destroy();
        this._instantiateGraph();
    }

    render() {
        return (
            <canvas id={this.props.id}/>
        );
    }
}
