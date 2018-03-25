import React from "react";
import {LeaderboardsAPI} from "../../api/leaderboards.js";

const {Component} = React;

const SORT_TYPES = {0: 'reps', 1: 'weights'};

export default class Leaderboards extends Component {
    _getLeaderboards() {
        LeaderboardsAPI.getLeaderboards()
            .then(response => response.json())
            .then((jsonData) => {
                this.state.leaderboards = jsonData.data;
            })
            .catch((error) => {
                this.setState({error: 'There was an error.'});
                console.log(error);
            });
    }

    componentWillMount() {
        this._getLeaderboards();
    }

    constructor(props) {
        super(props);
        this.sortBy = 'reps';
        this.reverseOrder = false;
        this.state = {leaderboards: [], error: null};

        this._sort = this._sort.bind(this);
        this._getLeaderboards = this._getLeaderboards.bind(this);
    }

    componentDidMount() {
        this._sort(this.sortBy);
    }

    _sort(sortby) {
        // If user clicks on same sortBy, reverse the order
        if (sortby === this.sortBy) {
            this.reverseOrder = !this.reverseOrder;
        }
        this.sortBy = sortby;

        let leaderboards = this.state.leaderboards;
        leaderboards.sort(
            (a, b) => {
                if (a[sortby] < b[sortby]) return 1;
                if (a[sortby] > b[sortby]) return -1;
                return 0;
            }
        );

        if (this.reverseOrder) leaderboards.reverse();

        this.setState(leaderboards);
    }

    render() {
        return (
            <div>
                <h2>Leaderboards</h2>
                <table className="highlight responsive-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th className="hover-pointer" onClick={(e) => this._sort('reps', e)}>
                            Reps
                        </th>
                        <th className="hover-pointer" onClick={(e) => this._sort('reps', e)}>
                            Weights
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.leaderboards.map(
                        (row, index) =>
                            <tr key={index}>
                                <td>{row.username}</td>
                                <td>{row.reps}</td>
                                <td>{row.weights}</td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}
