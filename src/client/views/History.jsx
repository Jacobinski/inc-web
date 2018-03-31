import React from "react";
import Socket from "../socket.js";

import {LoadingIcon} from "../components/LoadingIcon.jsx";
import DefaultMessage from "../components/DefaultMessage.jsx";
import Toast from "../components/Toast.jsx";
import Calendar from "react-calendar";
import Chart from "chart.js";
import {ExercisesAPI} from "../../api/exercises";
//noinspection JSUnresolvedVariable
import {FormSelect} from "materialize-css";

import {SEC_TO_MSEC} from "../constants";
const {Component} = React;
const HOUSES = ['Stark', 'Lannister', 'Targaryen', 'Baratheon', 'Greyjoy'];

export default class History extends Component {
    static _initForm() {
        let elem = document.querySelector('#select-user');
        FormSelect.init(elem);
    }

    _getExercises() {
        this.setState({loading: true});
        let date = this.state.date;
        ExercisesAPI.getExercises(this.state.username, date.getMonth() + 1, date.getFullYear())
            .then(response => response.json())
            .then((jsonData) => {
                if (jsonData.data) {
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
                }
                this.setState({loading: false});
            })
            .catch((error) => {
                this.setState({error: 'There was an error.'});
                console.log(error);
            });
    }

    _onUpdate() {
        new Toast('History updated!');
        this._getExercises();
    }

    componentWillMount() {
        this._getExercises();
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            monthData: [],
            dayData: [],
            today: new Date(),
            error: null,
            username: 'Stark',
            activeDays: [],
            loading: true
        };

        this._selectDate = this._selectDate.bind(this);
        this._generateID = this._generateID.bind(this);
        this._selectUser = this._selectUser.bind(this);
        this._onUpdate = this._onUpdate.bind(this);

        this.TILE_CLASS_NAME = 'gym-day';
        this.DEFAULT_MESSAGE = 'Your completed workouts will show here.  Days where you worked out are highlighted.';

        this.socket = new Socket();
        this.socket.on('update', this._onUpdate);
    }

    componentDidMount() {
        History._initForm();
    }

    componentDidUpdate() {
        History._initForm();
    }

    _selectUser(e) {
        this.setState({username: e.target.value}, () => this._getExercises());
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
                <h2>History <span className="small">of house {this.state.username}</span></h2>
                <div className="row eq-col-container">
                    <div className="col eq-col s12 m6">
                        <div className="input-field col s12">
                            <select id="select-user"
                                    value={this.state.username}
                                    onChange={this._selectUser}>
                                {HOUSES.map(
                                    (house, index) =>
                                        <option key={index} value={house}>{house}</option>
                                )}
                            </select>
                            <label htmlFor="#select-user">Select user</label>

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
                    </div>
                    <div className="col eq-col s12 m6">
                        {this.state.loading ? <LoadingIcon/> :
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
                                    ) : <DefaultMessage message={this.DEFAULT_MESSAGE}/>}
                            </div>
                        }
                    </div>
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
                                        <img src={
                                            this.props.picture ?
                                                `data:image/png;base64, ${this.props.picture}` :
                                                'https://cdn-maf0.heartyhosting.com/sites/muscleandfitness.com/files/styles/full_node_image_1090x614/public/media/ArnoldRealTitlePic.jpg?itok=MxniX-9P'}/>
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
