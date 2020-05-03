import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_REST_API;
const API_TOKEN = "9c9ae8a3d0afe9b28787537f6455c4f0";

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
        console.log(this.state.selectVideo)
    }

    getVideoInfo = (filmTitle) => {
        // Tmdb test
        console.log(filmTitle)
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + filmTitle
        axios.get(url
        )
            .then(response => {
                let filmDetail = {
                    'title': filmTitle,
                    'overview': response.data.results[0].overview,
                    'poster_path': "https://image.tmdb.org/t/p/w300" + response.data.results[0].poster_path,
                    'vote_average': response.data.results[0].vote_average,
                }
                // selectVideo.push(filmDetail)
                this.setState({ selectVideo: filmDetail })
                console.log(this.state.selectVideo)
            })
            .catch(error => {
                // this.setState({ loadSpinner: false });
            });


    }


    render() {
        const item = this.state.selectVideo;

        return (
            <div className="video-detail">
                {this.state.selectVideo &&
                    <div className="video-detail__content">
                        <img src={this.state.selectVideo.poster_path} alt="film-photo" className="video-detail__content__img" />
                        <div className="video-detail__content__text">
                            <h2 className="video-detail__content__text__title">{this.state.selectVideo.title}</h2>
                            <p className="video-detail__content__text__overview">{this.state.selectVideo.overview}</p>
                            <span className="video-detail__content__text__vote">Note Tmdb: {this.state.selectVideo.vote_average} / 10</span>
                        </div>
                        <div className="video-detail__player">

                            {!this.state.videoIsPlay &&
                                <button onClick={() => this.setState({ videoIsPlay: true })}>
                                    Regarder
                                </button>
                            }
                            {this.state.videoIsPlay &&
                                <iframe
                                    allowFullScreen="alloFullScreen"
                                    height="315"
                                    src={apiUrl + "video/" + this.state.selectVideo.title}
                                    width="100%"
                                    content-type="video/mkv"
                                ></iframe>
                            }
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
