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


        let levelAccess;
        if (this.props.userRole === 3) {
            levelAccess =
                <div className="home__links">
                    <Link className="home__links__link" to="/video">
                        <span >Films</span>
                    </Link>
                    <Link className="home__links__link" to="/series">
                        <span >Séries</span>
                    </Link>
                    <Link className="home__links__link" to="/music">
                        <span >Musiques</span>
                    </Link>
                    <Link className="home__links__link" to="/admin">
                        <span >Administration</span>
                    </Link>

                </div>
        } else if (this.props.userRole === 2) {
            levelAccess =
                <div className="home__links">
                    <Link className="home__links__link" to="/video">
                        <span >Vidéos</span>
                    </Link>
                    <Link className="home__links__link" to="/series">
                        <span >Séries</span>
                    </Link>
                    <Link className="home__links__link" to="/music">
                        <span >Musiques</span>
                    </Link>
                </div>
        }
        else {
            levelAccess =
                <div className="home__links">
                    <Link className="home__links__link" to="/video">
                        <span >Vidéos</span>
                    </Link>
                    <Link className="home__links__link" to="/series">
                        <span >Séries</span>
                    </Link>
                </div>
        }
        return (
            <div className="home">
                <div className="home__links">
                    {levelAccess}
                </div>
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
        userRole: state.user.role,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

