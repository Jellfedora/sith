import React, { Component } from 'react';
import Fuse from 'fuse.js'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const apiUrl = process.env.REACT_APP_REST_API;

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfVideos: [],
            searchInlistOfVideos: [],
            titleOfVideos: [],
            searchVideoResults: [],
            searchActive: false,
            loadVideosSpinner: false
        };
    }

    componentDidMount() {
        // Get all videos
        this.getVideos();
    }

    componentDidUpdate() {
    }


    getVideos = () => {
        this.setState({ loadVideosSpinner: true })
        axios.get(apiUrl + 'all-films'
        )
            .then(response => {
                let listOfVideos = this.state.listOfVideos


                let titleOfVideos = this.state.titleOfVideos
                let test = []
                response.data.map((item, i) => {
                    console.log(item)
                    let filmDetail = item;
                    listOfVideos.push(filmDetail);

                    test = {
                        'key': item.title.toLowerCase(),
                        'value': item.title,
                    }


                    titleOfVideos.push(test);

                    this.setState({ listOfVideos: listOfVideos, titleOfVideos: titleOfVideos, loadVideosSpinner: false })
                    // return true;
                })
                // this.triArray()
            })
            .catch(error => {
                this.setState({ loadVideosSpinner: false })
            });
    }

    handleSearchFilmChange = (e) => {
        let idTarget = e.target.value;
        this.setState({ searchFilm: idTarget });


        if (idTarget.length > 0) {
            const options = {
                includeScore: true,
                keys: ['title']
            }
            const fuse = new Fuse(this.state.listOfVideos, options)
            const result = fuse.search(idTarget)
            this.setState({ searchVideoResults: result, searchActive: true })

        } else {
            this.setState({ searchActive: false })
        }

    }

    deleteSearch = () => {
        this.setState({ searchVideoResults: [], searchActive: false, searchFilm: '' })
    }

    render() {
        const listOfVideos = this.state.listOfVideos.map((item, i) => {
            return (
                <Link className="video__content__video-info" to={'/video-detail/' + item.title} key={i}>
                    < img src={item.poster_path} alt="film-poster" className="video__content__video-info__img" />
                    <div className="video__content__video-info__text">
                        <span className="video__content__video-info__text__title">{item.title}</span>
                        <p className="video__content__video-info__text__overview">{item.overview.substr(0, 250)}</p>
                        <span className="video__content__video-info__text__vote">Note Tmdb: {item.vote_average} / 10</span>
                    </div>
                </Link >
            );
        });
        const searchVideos = this.state.searchVideoResults.map((item, i) => {
            return (
                <Link className="video__content__video-info" to={'/video-detail/' + item.item.title} key={i}>
                    < img src={item.item.poster_path} alt="film-poster" className="video__content__video-info__img" />
                    <div className="video__content__video-info__text">
                        <span className="video__content__video-info__text__title">{item.item.title}</span>
                        <p className="video__content__video-info__text__overview">{item.item.overview.substr(0, 250)}</p>
                        <span className="video__content__video-info__text__vote">Note Tmdb: {item.item.vote_average} / 10</span>
                    </div>
                </Link >
            );
        });

        return (
            <div className="video" >
                {this.state.loadVideosSpinner
                    ?
                    <div className="video__loader">
                        <FontAwesomeIcon
                            icon="spinner"
                            spin
                            size="2x"
                        />
                    </div>
                    :
                    <div className="video__content">
                        {this.state.searchActive
                            ?
                            <div className="video__content__display">
                                {searchVideos}
                            </div>
                            :
                            <div className="video__content__display">
                                {listOfVideos}
                            </div>
                        }
                    </div>

                }


                <div className="video__searchbar">
                    <div className='video__searchbar__opacity'>
                    </div>
                    <div className='video__searchbar__content'>
                        <input type="text" id="InputId" value={this.state.searchFilm} onChange={this.handleSearchFilmChange} placeholder="Rechercher" />
                        <button className='video__searchbar__content__delete' onClick={this.deleteSearch}>
                            <FontAwesomeIcon
                                icon="times-circle"
                                size="1x"
                            />
                        </button>
                    </div>
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

