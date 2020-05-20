import React, { Component } from 'react';
import Fuse from 'fuse.js'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const apiUrl = process.env.REACT_APP_REST_API;

class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadVideosSpinner: false,
            listOfSeries: []
        };
    }

    componentDidMount() {
        // Get all videos
        this.getSeries();
    }

    componentDidUpdate() {
        console.log(this.state.listOfSeries)
    }

    getSeries = () => {
        this.setState({ loadVideosSpinner: true })
        axios.get(apiUrl + 'check-series'
        )
            .then(response => {
                this.setState({ listOfSeries: response.data })
            })
            .catch(error => {
                this.setState({ loadVideosSpinner: false })
            });
    }

    render() {
        const listOfSeries = this.state.listOfSeries.map((item, i) => {
            return (
                <Link className="video__content__video-info" to={'/serie-detail/' + item.serie_name} key={i}>
                    {/* < img src={item.poster_path} alt="film-poster" className="video__content__video-info__img" /> */}
                    <div className="video__content__video-info__text">
                        <span className="video__content__video-info__text__title">{item.serie_name}</span>
                        <span className="video__content__video-info__text__title">{item.seasons.length} saisons</span>
                    </div>
                </Link >
            );
        });

        return (
            <div className="video" >
                <h2>Series</h2>
                {listOfSeries}
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Series);

