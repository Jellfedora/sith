import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Websocket from '../../containers/Websocket'
import Home from '../Home';
import Music from '../Music';
import Video from '../Video';
import VideoDetail from '../VideoDetail/index.jsx';
import App from '../App';
import Authentificator from "../Authentificator";
import Administration from "../Administration";
import VideoAdmin from '../VideoAdmin';
import SeriesAdmin from '../SeriesAdmin';
import MusicsAdmin from '../MusicsAdmin';
import Users from '../Users';
import Series from '../Series';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const apiUrl = process.env.REACT_APP_REST_API;

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const action = { type: "LOADER_START", value: true }
        this.props.dispatch(action)
    }

    componentDidUpdate() {
    }

    render() {
        let render;
        if (!this.props.serverIsDown) {
            render =
                <div className="server-down">
                    <div className="server-down__content">
                        <h2 className="server-down__content__title">Le serveur est actuellement en maintenance</h2>
                        <p className="server-down__content__message">La page sera automatiquement mise à jour une fois la connexion rétablie</p>
                    </div>
                </div>
        } else
            if (!this.props.isConnect) {
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
                <Websocket />
                <Router>
                    <div className="navigation__header">
                        <Link className="navigation__header__title" to="/">
                            <h1>SITH</h1>
                            <span>By Jellfedora</span>
                        </Link>
                    </div>
                    {this.props.loaderStart &&
                        <div className="loader">
                            <FontAwesomeIcon
                                icon="spinner"
                                spin
                                size="2x"
                            />
                        </div>
                    }
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
        loaderStart: state.animations.loaderStart,
        userToken: state.user.token,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

