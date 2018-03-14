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
                { (this.props.data.length > 0) ? this.props.data.map(
                        (tile, index) => {
                            return (
                                <div key={index} className="scroll-menu-item">
                                    <div className="card small">
                                        <div className="card-content">
                                            <span className="card-title">{tile.exercise}</span>
                                            <Graph key={index}
                                                   id={`graph-${index}`}
                                                   reps={tile.reps}
                                                   weights={tile.weights}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    ) :
                    <div className="card">
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
                    </div>}
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
