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
        console.log(this.props.userRole)
        if (this.props.userRole === 3) {
            levelAccess =
                <div className="home__links">
                    <Link className="home__links__link" to="/music">
                        <span>Musiques</span>
                    </Link>
                    <Link className="home__links__link" to="/music">
                        <span>Todo Galerie</span>
                    </Link>
                    <Link className="home__links__link" to="/admin">
                        <span>Administration</span>
                    </Link>
                </div>
        } else if (this.props.userRole === 2) {
            levelAccess =
                <div className="home__links">
                    <Link className="home__links__link" to="/music">
                        <span>Musiques</span>
                    </Link>
                    <Link className="home__links__link" to="/music">
                        <span>Todo Galerie</span>
                    </Link>
                </div>
        }
        else {
            levelAccess = ""
        }
        return (
            <div className="home">
                <div className="home__links">
                    <Link className="home__links__link" to="/video">
                        <span>Vidéos</span>
                    </Link>
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

