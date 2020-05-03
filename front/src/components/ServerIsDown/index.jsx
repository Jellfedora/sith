import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_REST_API;

class ServerIsDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ServerIsDown: false
        };
    }

    componentDidMount() {
        this.getServerStatus();
    }

    componentDidUpdate() {
        console.log('navigation')
        // this.getServerStatus();
    }

    getServerStatus = () => {
        setTimeout(() => {
            axios.get(apiUrl + 'start'
            )
                .then(response => {
                    const action = { type: "SERVER_IS_START", value: true }
                    this.props.dispatch(action)
                    this.getServerStatus()
                })
                .catch(error => {
                    const action = { type: "SERVER_IS_START", value: false }
                    this.props.dispatch(action)
                    this.getServerStatus()
                });
        }, 3000);


    }

    render() {
        return (
            <div className="server-down">
                <div className="server-down__content">
                    <h2 className="server-down__content__title">Le serveur est actuellement en maintenance</h2>
                    <p className="server-down__content__message">Veuillez contacter l'administrateur du site ou réessayer plus tard</p>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ServerIsDown);

