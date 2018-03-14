import React from "react";
import Calendar from "react-calendar";
import Chart from "chart.js";

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
                <div className="row">
                    <div className="col s12 m6 center">
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
                                  }}
                        />
                    </div>
                    <div className="col s12 m6 center">
                        <div className="scroll-menu">
                            {this.state.dayData.length > 0 ? this.state.dayData.map(
                                    (exercise, index) => {
                                        return (
                                            <WorkoutData index={index}
                                                         reps={exercise.reps}
                                                         weights={exercise.weights}
                                                         name={exercise.exercise}/>
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
        return (<div className="card">
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
        </div>)
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
                                    <span className="card-title">{this.props.name}</span>
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
