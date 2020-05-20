import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../Home';
import Music from '../Music';
import Video from '../Video';
import VideoDetail from '../VideoDetail/index.jsx';
import ServerIsDown from '../ServerIsDown';
import App from '../App';
import Authentificator from "../Authentificator";
import Administration from "../Administration";
import VideoAdmin from '../VideoAdmin';
import SeriesAdmin from '../SeriesAdmin';
import MusicsAdmin from '../MusicsAdmin';
import Users from '../Users';
import Series from '../Series';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_REST_API;

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: Cookies.get('name'),
            role: Cookies.get('role')
        };
    }

    componentDidMount() {

        this.getServerStatus();
        console.log(this.state)

        // Vérifie si des cookies sont existant
        if (this.state.name && this.state.role) {
            let cookie = {
                'name': this.state.name,
                'role': this.state.role
            }

            const action = { type: "SAVE_USER", value: cookie }
            this.props.dispatch(action)
        }
    }

    componentDidUpdate() {
    }

    getServerStatus = () => {
        axios.get(apiUrl + 'start'
        )
            .then(response => {
                const action = { type: "SERVER_IS_START", value: true }
                this.props.dispatch(action)
            })
            .catch(error => {
                const action = { type: "SERVER_IS_START", value: false }
                this.props.dispatch(action)
            });

    }

    render() {
        let render;
        if (!this.props.serverIsDown) {
            render = <ServerIsDown />
        } else if (!this.props.isConnect) {
            render = <Authentificator />
        } else {
            render =
                <Switch>
                    <Route path="/admin/musics">
                        <MusicsAdmin />
                    </Route>
                    <Route path="/admin/series">
                        <SeriesAdmin />
                    </Route>
                    <Route path="/series">
                        <Series />
                    </Route>
                    <Route path="/admin/videos">
                        <VideoAdmin />
                    </Route>
                    <Route path="/admin/users">
                        <Users />
                    </Route>
                    <Route path="/admin">
                        <Administration />
                    </Route>
                    <Route path="/video-detail" component={App}>
                        <VideoDetail />
                    </Route>
                    <Route path="/video">
                        <Video />
                    </Route>
                    <Route path="/music">
                        <Music />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
        }
        return (
            <div className="navigation">
                <Router>
                    <div className="navigation__header">
                        <Link className="navigation__header__title" to="/">
                            <h1>SITH</h1>
                            <span>By Jellfedora</span>
                        </Link>
                    </div>
                    {render}

                </Router >
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    return {
        serverIsDown: state.server.isStart,
        isConnect: state.user.isConnect,
        userRole: state.user.role,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

