import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
        console.log(this.state.selectVideo)
    }

    getVideoInfo = (filmTitle) => {
        // axios.get(url
        // )
        //     .then(response => {
        //         let filmDetail = {
        //             'title': filmTitle,
        //             'overview': response.data.results[0].overview,
        //             'poster_path': "https://image.tmdb.org/t/p/w300" + response.data.results[0].poster_path,
        //             'vote_average': response.data.results[0].vote_average,
        //         }
        //         // selectVideo.push(filmDetail)
        //         this.setState({ selectVideo: filmDetail })
        //         console.log(this.state.selectVideo)
        //     })
        //     .catch(error => {
        //         // this.setState({ loadSpinner: false });
        //     });
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
                console.log(this.state.selectVideo)
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

                            {!this.state.videoIsPlay &&
                                <button onClick={() => this.setState({ videoIsPlay: true })}>
                                    Regarder
                                </button>
                            }
                            {this.state.videoIsPlay &&
                                <iframe
                                    title="video-player"
                                    allowFullScreen="alloFullScreen"
                                    height="315"
                                    src={apiUrl + "video/" + item.media_name}
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
