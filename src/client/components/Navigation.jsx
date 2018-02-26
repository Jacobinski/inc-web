import React from "react";
import {Link, Route} from "react-router-dom";
import Planner from "./Planner.jsx";
import Feed from "./Feed.jsx";
import Profile from "./Profile.jsx";

const {Component} = React;
const VIEWS = [
    {id: 1, path: '/planner', title: 'Planner', component: Planner},
    {id: 2, path: '/feed', title: 'Feed', component: Feed},
    {id: 3, path: '/profile', title: 'Profile', component: Profile}
];

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: null};
    }

    _views(mobile=false) {
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
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">increment</a>
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
            <div className="">
                {VIEWS.map(view =>
                    <Route key={view.id} path={view.path} component={view.component}/>
                )}
            </div>
        );
    }
}
