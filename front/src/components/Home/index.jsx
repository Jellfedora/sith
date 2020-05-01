import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className="home">
                <Link className="home__link__home" to="/">
                    <span>Vidéos</span>
                </Link>
                <Link className="home__link__music" to="/music">
                    <span>Musiques</span>
                </Link>
                <Link className="home__link__galery" to="/music">
                    <span>Galerie</span>
                </Link>
                <Link className="home__link__option" to="/music">
                    <span>Réglages</span>
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
    return {
        // isStart: state.home.isStart,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

