import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import CastProvider from 'react-chromecast';
import CastButton from '../CastButton';
import VideoCast from '../VideoCast';
import VideoPlayer from '../VideoPlayer';
const apiUrl = process.env.REACT_APP_REST_API;

class VideoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectVideo: null,
            videoIsPlay: false
        };
    }

    componentDidMount() {
        const filmTitle = this.props.location.pathname.split('/')[2]
        this.getVideoInfo(filmTitle);
    }

    componentDidUpdate() {
    }


    getVideoInfo = (filmTitle) => {
        axios.get(apiUrl + 'one-film/' + filmTitle
        )
            .then(response => {
                let filmDetail = {
                    'title': response.data.title,
                    'overview': response.data.overview,
                    'poster_path': response.data.poster_path,
                    'vote_average': response.data.vote_average,
                    'media_name': response.data.media_name,
                    'release_date': response.data.release_date
                }
                // selectVideo.push(filmDetail)
                this.setState({ selectVideo: filmDetail })
            })
            .catch(error => {
            });
    }

    render() {
        const item = this.state.selectVideo;
        return (
            <div className="video-detail">
                {item &&
                    <div className="video-detail__content">
                        <img src={item.poster_path} alt="film-poster" className="video-detail__content__img" />
                        <div className="video-detail__content__text">
                            <h2 className="video-detail__content__text__title">{item.title}</h2>
                            <p className="video-detail__content__text__overview">{item.overview}</p>
                            <span className="video-detail__content__text__vote">Note Tmdb: {item.vote_average} / 10</span>
                            <span className="video-detail__content__text__vote">Sortie: {item.release_date} / 10</span>
                        </div>
                        <div className="video-detail__player">
                            {/* Dev */}
                            {/* <VideoPlayer mediaTitle={apiUrl + "video/" + item.media_name} /> */}
                            <VideoPlayer mediaTitle='https://sith-api.hopto.org/api/video/6%20Underground' />


                            {/* < CastProvider >
                                <CastButton />
                                <VideoCast mediaTitle="https://sith-api.hopto.org/api/video/6%20Underground" />
                            </ CastProvider > */}


                            {/* Prod */}
                            {/* < CastProvider >
                            <CastButton />
                            <VideoCast mediaTitle={apiUrl + "video/" + item.media_name} />
                        </ CastProvider > */}


                            {/* <div data-vjs-player>
                                <video ref={node => this.videoNode = node} className="video-js"></video>
                            </div> */}
                        </div>
                    </div >
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
        // isStart: state.home.isStart,
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoDetail));
