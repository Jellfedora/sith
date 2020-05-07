import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    Link
} from "react-router-dom";

const apiUrl = process.env.REACT_APP_REST_API;

class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectPage: 0,
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    // handleIdChange = (e) => {
    //     let idTarget = e.target.value;
    //     this.setState({ id: idTarget });
    // }

    render() {
        return (
            <div className="admin">
                <Link className="admin__link" to="/admin/users">
                    <span>Gestion Utilisateurs</span>
                </Link>
                <Link className="admin__link" to="/music">
                    <span>Gestion Vidéos</span>
                </Link>
            </div >
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
        // isConnect: state.user.isConnect,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Administration);

