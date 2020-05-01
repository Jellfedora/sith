import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../Home';
import Music from '../Music';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    clic = (status) => {
        const action = { type: "CLICK", value: status }
        this.props.dispatch(action)
    }

    render() {
        return (
            <div className="navigation">
                {/* <div className="navigation__content"> */}
                <Router>
                    <div className="navigation__header">
                        <Link className="navigation__header__title" to="/">
                            <h1>SITH</h1>
                            <span>By Jellfedora</span>
                        </Link>
                    </div>

                    <Switch>
                        <Route path="/music">
                            <Music />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router >
                {/* </div> */}
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
    console.log(state);
    return {
        // isStart: state.home.isStart,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

