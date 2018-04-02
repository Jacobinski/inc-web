import React from "react";
import {TEAMS} from "../../client/constants.js";

import gainsofthrones from "../../../assets/img/gainsofthrones.png";

const {Component} = React;

export default class Index extends Component {
    componentWillMount() {
        this.got
    }

    render() {
        return (
            <div className="row">
                <img className="col s12 responsive-img center"  src={gainsofthrones}/>
                <div className="col s12 scroll-menu house-cards">
                    {TEAMS.map((team, index) => {
                            return (
                                <div className="scroll-menu-item" key={index}>
                                    <div className="card house-card sticky-action blue-grey darken-4">
                                        <div className="card-image waves-effect waves-block waves-light">
                                            <img className="activator" src={team.banner}/>
                                        </div>
                                        <div className="card-content white-text">
                                            <span className="card-title activator">
                                                {team.house}
                                                <i className="material-icons right">more_vert</i>
                                            </span>
                                            <blockquote><i>"{team.words}"</i></blockquote>
                                        </div>
                                        <div className="card-reveal blue-grey darken-2 white-text">
                                            <div className="center">
                                                <img className="circle" src={team.avatar} width={100} height={100}/>
                                            </div>
                                            <br/>
                                            <span className="card-title white-text">
                                                {team.house}
                                                <i className="material-icons right">close</i>
                                            </span>
                                            <blockquote><i>"{team.words}"</i></blockquote>
                                            <p>{team.desc}</p>
                                            <h6>{team.person}</h6>
                                            <b className={team.role === 'Platform' ?
                                                'red-text text-accent-2' :
                                                'teal-text text-lighten-3'}>
                                                {team.role}
                                            </b>
                                        </div>
                                        <div className="card-action center">
                                            {team.links.map((link, index) => {
                                                return (
                                                    <a key={index} target="_blank" href={link.url}>
                                                        <i className={`fa ${link.icon}`}> </i>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }
}
