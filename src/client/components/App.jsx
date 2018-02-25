import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Planner from './Planner.jsx';
import Feed from './Feed.jsx';
import Profile from './Profile.jsx';

const {Component} = React;
const VIEWS = [
    {id: 1, path: '/planner', title: 'Planner', component: Planner},
    {id: 2, path: '/feed', title: 'Feed', component: Feed},
    {id: 3, path: '/profile', title: 'Profile', component: Profile}
];

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>increment</h1>
                    <ul className="header">
                        {VIEWS.map(
                            view => <li key={view.id}><Link to={view.path}>{view.title}</Link></li>
                        )}
                    </ul>
                    <div className="content">
                        {VIEWS.map(
                            view => <Route key={view.id} path={view.path} component={view.component}/>
                        )}
                    </div>
                </div>
            </Router>
        );
    }
}
