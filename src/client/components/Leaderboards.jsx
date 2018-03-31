import React from "react";
import {LeaderboardsAPI} from "../../api/leaderboards.js";
import {PING_INTERVAL_MSEC} from "../constants.js";
import {LoadingIcon} from "./LoadingIcon.jsx";
import DefaultMessage from "./DefaultMessage.jsx";
const {Component} = React;

export default class Leaderboards extends Component {
    _getLeaderboards() {
        this.setState({loading: true});
        LeaderboardsAPI.getLeaderboards()
            .then(response => response.json())
            .then((jsonData) => {
                this.state.leaderboards = jsonData.data;
                this.state.table = jsonData.data;
                this.setState({loading: false});
            })
            .catch((error) => {
                this.setState({error: 'There was an error.'});
                console.log(error);
            });
    }

    componentWillMount() {
        this._getLeaderboards();
        this.ping = setInterval(() => this._getLeaderboards(), PING_INTERVAL_MSEC);
    }

    constructor(props) {
        super(props);
        this.sortBy = 'reps';
        this.reverseOrder = false;
        this.state = {leaderboards: [], table: [], error: null, filterBy: '', loading: true};

        this._sort = this._sort.bind(this);
        this._filterTable = this._filterTable.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
        this._getLeaderboards = this._getLeaderboards.bind(this);
    }

    componentDidMount() {
        this._sort(this.sortBy);
    }

    componentWillUnmount() {
        clearInterval(this.ping);
    }

    _sort(sortby) {
        // If user clicks on same sortBy, reverse the order
        if (sortby === this.sortBy) {
            this.reverseOrder = !this.reverseOrder;
        }
        this.sortBy = sortby;

        let table = this.state.table;
        table.sort(
            (a, b) => {
                if (a[sortby] < b[sortby]) return 1;
                if (a[sortby] > b[sortby]) return -1;
                return 0;
            }
        );

        if (this.reverseOrder) table.reverse();

        this.setState(table);
    }

    _filterTable(e) {
        let filterBy = e.target.value;
        this.setState({filterBy});
        console.log(this.state.leaderboards);

        let table = this.state.leaderboards.filter(
            (item) => {
                if (item.username) {
                    return (item.username.toLowerCase().search(filterBy.toLowerCase()) !== -1);
                }

            }
        );
        this.setState({table});

        this._sort(this.sortBy);
    }

    _clearFilter() {
        this.setState({filterBy: '', table: this.state.leaderboards});
    }

    render() {
        return (
            <div>
                <h2>Leaderboards</h2>
                <nav>
                    <div className="nav-wrapper teal lighten-2">
                        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-field">
                                <input id="search"
                                       type="search"
                                       value={this.state.filterBy}
                                       onChange={(e) => this._filterTable(e)}
                                       placeholder="username"/>
                                <label className="label-icon" htmlFor="search">
                                    <i className="material-icons">search</i>
                                </label>
                                <i className="material-icons" onClick={this._clearFilter}>close</i>
                            </div>
                        </form>
                    </div>
                </nav>

                {this.state.loading ? <LoadingIcon/> :
                    this.state.leaderboards.length ?
                        this.state.table.length ?
                            <table className="highlight responsive-table">
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th className="hover-pointer" onClick={(e) => this._sort('reps', e)}>
                                        Reps
                                    </th>
                                    <th className="hover-pointer" onClick={(e) => this._sort('weights', e)}>
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
                            </table> :
                            <DefaultMessage message="No users by that username"/> :
                        <DefaultMessage/>
                }
            </div>
        );
    }
}
