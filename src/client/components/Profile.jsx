import React from "react";
import Calendar from "react-calendar";
import Chart from "chart.js";
import {EXERCISE_TYPES, EXERCISE_IMG, SEC_TO_MSEC, PING_INTERVAL} from "../constants";
import {WorkoutsAPI} from "../../api/workouts";

const {Component} = React;

export default class Profile extends Component {
    _getWorkouts() {
        let date = this.state.date;
        WorkoutsAPI.getWorkouts('Jacobinski', date.getMonth() + 1, date.getFullYear())
            .then(response => response.json())
            .then((jsonData) => {
                let {username, data} = jsonData.data;
                data = data.map((entry) => {
                        entry.date = new Date(entry.date * SEC_TO_MSEC);
                        return entry;
                    }
                );
                let activeDays = [];
                for (let entry of data) {
                    activeDays.push(entry.date);
                }

                this.setState({monthData: data, activeDays, username});
                this._selectDate(date);
            })
            .catch((error) => {
                this.setState({error: 'There was an error.'});
                console.log(error);
            });
    }

    componentWillMount() {
        this._getWorkouts();
        this.ping = setInterval(() => this._getWorkouts(), PING_INTERVAL);
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            monthData: [],
            dayData: [],
            today: new Date(),
            error: null,
            username: null,
            activeDays: []
        };

        this._selectDate = this._selectDate.bind(this);
        this._generateID = this._generateID.bind(this);
        this.TILE_CLASS_NAME = 'gym-day';

    }

    componentWillUnmount() {
        clearInterval(this.ping);
    }

    _selectDate(date) {
        this.setState({date, dayData: []});
        let dayData = [];

        for (let entry of this.state.monthData) {
            let entryDate = entry.date;
            entryDate.setHours(0, 0, 0, 0);
            if (entryDate.getTime() == date.getTime()) {
                dayData.push(entry['exercises']);
            }
        }
        this.setState({dayData});
    }

    _generateID(index, key) {
        return `${index}-workout-${this.state.username}-${key}`;
    }

    render() {
        return (
            <div>
                <h2>Profile</h2>
                <div className="row eq-col-container">
                    <div className="col eq-col s12 m6">
                        <Calendar className="calendar"
                                  onChange={this._selectDate}
                                  maxDate={this.state.today}
                                  value={this.state.date}
                                  tileClassName={({date, view}) => {
                                      let day = date.getDate();
                                      let month = date.getMonth();
                                      let year = date.getFullYear();

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
                                                  if (month === activeDay.getMonth() && year === activeDay.getFullYear()) {
                                                      return this.TILE_CLASS_NAME;
                                                  }
                                              }
                                              break;
                                          case 'decade':
                                              for (let activeDay of this.state.activeDays) {
                                                  if (year === activeDay.getFullYear()) {
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
                                                         reps={exercise.reps}
                                                         weights={exercise.weights}
                                                         name={EXERCISE_TYPES[exercise.exerciseID]}
                                                         exerciseID={exercise.exerciseID}
                                                         startTimes={exercise.startTimes}
                                                         endTimes={exercise.endTimes}
                                                         id={this._generateID(index, exercise.startTimes[0])}/>
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
    _toggleClass() {
        document.querySelector(`#toggle-node-${this.props.id}`).classList.toggle('flip');
    }

    constructor(props) {
        super(props);

        this._toggleClass = this._toggleClass.bind(this);
    }

    componentDidUpdate() {
        document.querySelector(`#toggle-node-${this.props.id}`).classList.remove('flip');
    }

    render() {
        return (
            <div key={this.props.index} className="scroll-menu-item">
                <div id={`toggle-node-${this.props.id}`}
                     ref="flip"
                     className="flip-container">

                    <div className="flipper">

                        <div className="front">
                            <div className="card small">
                                <div className="card-content">
                                    <span className="card-title">{this.props.name}</span>
                                    <Graph key={this.props.index}
                                           id={`graph-${this.props.id}`}
                                           reps={this.props.reps}
                                           weights={this.props.weights}
                                           startTimes={this.props.startTimes}
                                           endTimes={this.props.endTimes}/>
                                    <a onClick={this._toggleClass}
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
                                    <a onClick={this._toggleClass}
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

    componentDidMount() {
        let ctx = document.getElementById(this.props.id).getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: Graph._getLabels(this.props.weights),
                datasets: [{
                    label: '# of reps',
                    data: this.props.reps.slice()
                }]
            }
        });
    }

    componentDidUpdate() {
        this.chart.data.labels = Graph._getLabels(this.props.weights);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data = this.props.reps.slice();
        });

        this.chart.update();
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return (
            <canvas id={this.props.id}/>
        );
    }
}
