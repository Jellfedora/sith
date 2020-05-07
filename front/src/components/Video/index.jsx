import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_REST_API;
const API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfVideos: [],
            selectVideo: null
        };
    }

    componentDidMount() {
        // Get all videos
        this.getVideos();

    }

    componentDidUpdate() {
        console.log(this.state.listOfVideos)
    }

    getVideos = () => {
        axios.get(apiUrl + 'all-films'
        )
            .then(response => {
                console.log(response)
                let listOfVideos = this.state.listOfVideos

                response.data.map((item, i) => {
                    let filmDetail = item;
                    listOfVideos.push(filmDetail);
                    this.setState({ listOfVideos: listOfVideos })
                })
            })
            .catch(error => {
            });
    }

    // getVideoInfo = (filmTitle, i) => {
    //     // Tmdb test
    //     console.log(filmTitle)
    //     const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + filmTitle
    //     axios.get(url
    //     )
    //         .then(response => {
    //             console.log(response)
    //             let listOfVideos = this.state.listOfVideos
    //             let filmDetail = {
    //                 'title': filmTitle,
    //                 'overview': response.data.results[0].overview,
    //                 'poster_path': "https://image.tmdb.org/t/p/w300" + response.data.results[0].poster_path,
    //                 'vote_average': response.data.results[0].vote_average,
    //             }
    //             listOfVideos.push(filmDetail)
    //             this.setState({ listOfVideos: listOfVideos })
    //         })
    //         .catch(error => {
    //         });


    // }

    streamVideo = (item) => {
        console.log(item)
        this.setState({ selectVideo: item })
    }

    render() {
        const listOfVideos = this.state.listOfVideos.map((item, i) => {
            return (
                <Link className="video__content__video-info" to={'/video-detail/' + item.title} key={i}>
                    < img src={item.poster_path} alt="film-photo" className="video__content__video-info__img" />
                    <div className="video__content__video-info__text">
                        <span className="video__content__video-info__text__title">{item.title}</span>
                        <p className="video__content__video-info__text__overview">{item.overview.substr(0, 250)}</p>
                        <span className="video__content__video-info__text__vote">Note Tmdb: {item.vote_average} / 10</span>
                    </div>
                </Link >
            );
        });
        const selectVideo = this.state.selectVideo;

        return (
            <div className="video" >
                <div className="video__content">
                    {listOfVideos}
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Video);

