import React from "react";
import Calendar from "react-calendar";
import Chart from "chart.js";
import {SEC_TO_MSEC, PING_INTERVAL_MSEC} from "../constants";
import {ExercisesAPI} from "../../api/exercises";

const {Component} = React;

export default class History extends Component {
    _getWorkouts() {
        let date = this.state.date;
        ExercisesAPI.getExercises('Stark', date.getMonth() + 1, date.getFullYear())
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
        this.ping = setInterval(() => this._getWorkouts(), PING_INTERVAL_MSEC);
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
                <h2>History</h2>
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
                                            <ExerciseData key={index}
                                                          index={index}
                                                          reps={exercise.reps}
                                                          weights={exercise.weights}
                                                          name={exercise.exercise}
                                                          exercise={exercise.exercise}
                                                          startTimes={exercise.startTimes}
                                                          endTimes={exercise.endTimes}
                                                          id={this._generateID(index, exercise.startTimes[0])}
                                                          picture={exercise.picture}
                                                          timeDisplay={exercise.startTimes[0]}
                                            />
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

class ExerciseData extends Component {
    static _formatDate(epoch) {
        let date = new Date(epoch * SEC_TO_MSEC);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timezone: 'America/Los_Angeles'
        });
    }

    static _sum(array) {
        return array.reduce((a, b) => a + b);
    }

    static _average(array) {
        return ExerciseData._sum(array) / array.length;
    }

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
                                    <div className="card-image">
                                        <img src={`data:image/png;base64, ${this.props.picture}`}/>
                                        <span className="card-title">
                                            {ExerciseData._formatDate(this.props.timeDisplay)}
                                        </span>
                                    </div>
                                    <div className="row">
                                        <h5 className="col s12 center-align"><b>{this.props.name}</b></h5>
                                        <p className="col s6 center-align">
                                            <u>Total reps:</u> <br/>
                                            {ExerciseData._sum(this.props.reps)}
                                        </p>
                                        <p className="col s6 center-align">
                                            <u>Average weight:</u> <br/>
                                            {ExerciseData._average(this.props.weights)} lbs
                                        </p>
                                    </div>
                                    <a onClick={this._toggleClass}
                                       className="btn-floating halfway-fab red">
                                        <i className="material-icons">flip_to_front</i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="back">
                            <div className="card small">
                                <div className="card-content">
                                    <span className="card-title"><b>{this.props.name}</b></span>
                                    <Graph key={this.props.index}
                                           id={`graph-${this.props.id}`}
                                           reps={this.props.reps}
                                           weights={this.props.weights}
                                           startTimes={this.props.startTimes}
                                           endTimes={this.props.endTimes}/>
                                    <h5 className="center-align">{ExerciseData._formatDate(this.props.timeDisplay)}</h5>
                                    <a onClick={this._toggleClass}
                                       className="btn-floating halfway-fab red">
                                        <i className="material-icons">flip_to_back</i>
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
                    data: this.props.reps.slice(),
                    backgroundColor: 'rgba(182, 215, 168, 0.4)'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
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
