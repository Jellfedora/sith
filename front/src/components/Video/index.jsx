import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import Fuse from 'fuse.js';
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const apiUrl = process.env.REACT_APP_REST_API;
let scroll = Scroll.animateScroll;

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // listOfVideos: [],
            searchInlistOfVideos: [],
            // titleOfVideos: [],
            searchVideoResults: [],
            searchActive: false,
            showCategory: true,
            getLastTen: [],
            sciFiGenre: [],
            fantasyGenre: [],
            horrorGenre: []
        };
    }

    componentDidMount() {
        // const action = { type: "LOADER_START", value: true }
        // this.props.dispatch(action)
        // Get all videos
        if (this.props.listOfVideos) {
            this.getVideos();

        }
    }

    componentDidUpdate() {
    }


    getVideos = () => {
        this.getLastTen();
        this.getCategorys();
    }

    handleSearchFilmChange = (e) => {
        scroll.scrollToTop();
        let idTarget = e.target.value;
        this.setState({ searchFilm: idTarget, showCategory: false });

        if (idTarget.length > 0) {
            const options = {
                includeScore: true,
                keys: ['title']
            }
            const fuse = new Fuse(this.props.listOfVideos, options)
            const result = fuse.search(idTarget)
            this.setState({ searchVideoResults: result, searchActive: true })

        } else {
            this.setState({ searchActive: false })

        }

    }

    deleteSearch = () => {
        this.setState({ searchVideoResults: [], searchActive: false, searchFilm: '' })
    }

    showCategory = () => {
        this.setState({ showCategory: true, searchFilm: '' })
    }

    hideCategory = () => {
        this.setState({ showCategory: false, searchFilm: '' })
    }

    getLastTen = () => {
        let listOfVideos = this.props.listOfVideos;
        console.log(listOfVideos)

        listOfVideos = listOfVideos.sort(this.sortByDate);

        const getLastTen = []
        for (let index = 0; index < 10; index++) {
            const video = listOfVideos[index];
            getLastTen.push(video)

        }
        this.setState({ getLastTen: getLastTen })
    }

    sortByDate = (a, b) => {
        var da = new Date(a.created_at);
        var db = new Date(b.created_at);
        return (da > db) ? 1 : -1;
    }

    getCategorys = () => {
        let listOfVideos = this.props.listOfVideos;

        let sciFiGenre = [];
        listOfVideos.forEach((video) => {
            if (video.genres_name.includes('Science-Fiction')) {
                sciFiGenre.push(video)
            }
        });

        let fantasyGenre = [];
        listOfVideos.forEach((video) => {
            if (video.genres_name.includes('Fantastique')) {
                fantasyGenre.push(video)
            }
        });

        let horrorGenre = [];
        listOfVideos.forEach((video) => {
            if (video.genres_name.includes('Horreur')) {
                horrorGenre.push(video)
            }
        });

        this.setState({ sciFiGenre: sciFiGenre, fantasyGenre: fantasyGenre, horrorGenre: horrorGenre })
    }

    render() {
        if (this.props.listOfVideos === null) {
            return <Redirect to='/' />;
        } else {
            const listOfVideos = this.props.listOfVideos.map((item, i) => {
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

            const getLastTen = this.state.getLastTen.map((item, i) => {
                return (
                    <Link className="video__category__container__link" to={'/video-detail/' + item.title} key={i} style={{ backgroundImage: "url(" + item.poster_path + ")" }}>
                    </Link >
                );
            });

            const getSciFi = this.state.sciFiGenre.map((item, i) => {
                return (
                    <Link className="video__category__container__link" to={'/video-detail/' + item.title} key={i} style={{ backgroundImage: "url(" + item.poster_path + ")" }}>
                    </Link >
                );
            });

            const getFantasy = this.state.fantasyGenre.map((item, i) => {
                return (
                    <Link className="video__category__container__link" to={'/video-detail/' + item.title} key={i} style={{ backgroundImage: "url(" + item.poster_path + ")" }}>
                    </Link >
                );
            });

            const getHorror = this.state.horrorGenre.map((item, i) => {
                return (
                    <Link className="video__category__container__link" to={'/video-detail/' + item.title} key={i} style={{ backgroundImage: "url(" + item.poster_path + ")" }}>
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

            let content;
            if (!this.state.showCategory) {
                content =
                    <div className="video">
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
                    </div>
            } else {
                content =
                    <div className="video__category">
                        <div className="video__category__container">
                            <h2>Derniers films ajoutés</h2>
                            <Carousel
                                withoutControls
                                width="100%"
                                slidesToShow={3.5}
                                slidesToScroll="auto"
                            >
                                {getLastTen}
                            </Carousel>
                        </div>
                        <div className="video__category__container">
                            <h2>Films de Science Fiction</h2>
                            <Carousel
                                withoutControls
                                width="100%"
                                slidesToShow={3.5}
                                slidesToScroll="auto"
                            >
                                {getSciFi}
                            </Carousel>
                        </div>
                        <div className="video__category__container">
                            <h2>Films Fantastique</h2>
                            <Carousel
                                withoutControls
                                width="100%"
                                slidesToShow={3.5}
                                slidesToScroll="auto"
                            >
                                {getFantasy}
                            </Carousel>
                        </div>
                        <div className="video__category__container">
                            <h2>Films Horreur</h2>
                            <Carousel
                                withoutControls
                                width="100%"
                                slidesToShow={3.5}
                                slidesToScroll="auto"
                            >
                                {getHorror}
                            </Carousel>
                        </div>
                    </div>
            }

            return (
                <div className="video">
                    {content}
                    < div className="video__searchbar">
                        <div className='video__searchbar__opacity'>
                        </div>
                        <div className='video__searchbar__content'>
                            <button className='video__searchbar__content__show-category' onClick={this.showCategory}>
                                <FontAwesomeIcon
                                    icon="home"
                                    size="1x"
                                />
                                <small>Catégories</small>
                            </button>
                            <div className='video__searchbar__content__input'>
                                <input type="text" id="InputId" autoComplete="off" value={this.state.searchFilm} onChange={this.handleSearchFilmChange} placeholder="Rechercher un film">
                                </input>

                                {this.state.searchActive &&
                                    <button className='video__searchbar__content__input__delete' onClick={this.deleteSearch}>
                                        <FontAwesomeIcon
                                            icon="times-circle"
                                            size="1x"
                                        />
                                    </button>
                                }
                            </div>
                            <button className='video__searchbar__content__show-category' onClick={this.hideCategory}>
                                <FontAwesomeIcon
                                    icon="border-all"
                                    size="1x"
                                />
                                <small>Tous</small>
                            </button>
                        </div>
                    </div>
                </div >
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        userToken: state.user.token,
        listOfVideos: state.movie.listOfVideos,
        titleOfVideos: state.movie.titleOfVideos
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Video);

