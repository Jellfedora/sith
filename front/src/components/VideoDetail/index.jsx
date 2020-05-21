import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const apiUrl = process.env.REACT_APP_REST_API;
class VideoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectVideo: null,
            showVideo: false
        };
    }

    componentDidMount() {
        const filmTitle = this.props.location.pathname.split('/')[2]
        this.getVideoInfo(filmTitle);
    }

    componentDidUpdate() {
    }



    getVideoInfo = (filmTitle) => {
        const config = {
            headers: { Authorization: `Bearer ${this.props.userToken}` }
        };
        axios.get(apiUrl + 'one-film/' + filmTitle, config
        )
            .then(response => {
                let date = new Date;
                date = date.toLocaleDateString()
                let filmDetail = {
                    'title': response.data.title,
                    'overview': response.data.overview,
                    'poster_path': response.data.poster_path,
                    'vote_average': response.data.vote_average,
                    'media_name': response.data.media_name,
                    'release_date': date
                }
                // selectVideo.push(filmDetail)
                this.setState({ selectVideo: filmDetail })
            })
            .catch(error => {
            });
    }

    showVideo = () => {
        this.setState({ showVideo: true })
    }

    render() {
        const item = this.state.selectVideo;
        return (
            <div className="video-detail">
                <Link className="video-detail__link-to-home" to="/video">
                    <FontAwesomeIcon
                        icon="arrow-left"
                        size="1x"
                    />
                </Link>
                {item &&
                    <div className="video-detail__content">
                        <div className="video-detail__content__poster">
                            <img src={item.poster_path} alt="film-poster" className="video-detail__content__poster__img" />
                            <div className="video-detail__content__poster__play">
                                <div className="video-detail__content__poster__play__background"></div>
                                <span className="video-detail__content__poster__play__icon" onClick={this.showVideo}>
                                    <FontAwesomeIcon
                                        icon="play"
                                        size="2x"
                                    />
                                </span>
                            </div>
                        </div>

                        <div className="video-detail__content__text">
                            <h2 className="video-detail__content__text__title">{item.title}</h2>
                            <p className="video-detail__content__text__overview">{item.overview}</p>
                            <span className="video-detail__content__text__vote"><span>Note Tmdb:</span> {item.vote_average} / 10</span>
                            <span className="video-detail__content__text__release"><span>Sortie:</span> {item.release_date}</span>
                        </div>
                    </div >
                }
                {this.state.showVideo &&
                    <div className="video-detail__player">
                        <VideoPlayer mediaTitle={apiUrl + "video/" + item.media_name} />
                    </div>
                }
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
        userToken: state.user.token,
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoDetail));
