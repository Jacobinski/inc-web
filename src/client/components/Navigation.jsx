import React from "react";
import {Link, Route} from "react-router-dom";
import Index from "../views/Index.jsx";
import Leaderboards from "../views/Leaderboards.jsx";
import History from "../views/History.jsx";
//noinspection JSUnresolvedVariable
import {Sidenav} from "materialize-css";

const {Component} = React;
const VIEWS = [
    {id: 1, path: '/history', title: 'History', component: History},
    {id: 2, path: '/leaderboards', title: 'Leaderboards', component: Leaderboards}
];

import increment_crown from "../../../assets/img/increment_crown.png";

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: null};
    }

    componentDidMount() {
        let elem = document.querySelector('.sidenav');
        Sidenav.init(elem);
    }

    _views(mobile = false) {
        return VIEWS.map(
            view =>
                <li key={view.id}
                    id={view.id}
                    className={this._classNames(view.id, mobile)}
                    onClick={(e) => this._setActive(view.id, e)}>
                    <Link to={view.path}>{view.title}</Link>
                </li>
        )
    }

    _classNames(id, mobile) {
        let classNames = [];
        if (mobile) {
            classNames.push('sidenav-close');
        }
        if (this.state.activeTab === id) {
            classNames.push('active');
        }
        return classNames.join(' ');
    }

    _setActive(id) {
        this.setState({activeTab: id});
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper container">
                        <a href="/" className="brand-logo">
                            <img src={increment_crown} className="responsive-img" height={25} width={25}/> &nbsp;
                            increment
                        </a>
                        <a href="#" data-target="mobile-sidenav" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            {this._views()}
                        </ul>
                    </div>
                </nav>

                <ul id="mobile-sidenav" className="sidenav">
                    {this._views(true)}
                </ul>
            </div>
        );
    }
}

export class Content extends Component {
    render() {
        return (
            <div className="container">
                <Route exact path={'/'} component={Index}/>
                {VIEWS.map(view =>
                    <Route key={view.id} path={view.path} component={view.component}/>
                )}
            </div>
        );
    }
}
