import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    Link
} from "react-router-dom";

const apiUrl = process.env.REACT_APP_REST_API;
const API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmTitle: '',
            searchResults: [],
            selectedFilm: undefined,
            showResults: true,
            medias: [],
            selectedMedia: undefined,
            statusMessage: false,
            statusMessageColor: undefined,
            searchStatusMessageError: false
        };
    }

    componentDidMount() {
        this.getMedia();
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    refresh = (event) => {
        axios.get(apiUrl + 'check-films'
        )
            .then(response => {
                console.log(response)
                this.getMedia()
            })
            .catch(error => {
                console.log(error)
            });
    }

    getMedia = () => {
        axios.get(apiUrl + 'admin-all-films'
        )
            .then(response => {
                console.log(response)
                response.data.map((item, i) => {
                    let filmDetail = {
                        'media_name': item.media_name,
                        'verified_by_admin': item.verified_by_admin
                    }

                    let medias = this.state.medias;
                    medias.push(filmDetail)
                    this.setState({ medias: medias, selectedMedia: response.data[0].media_name })
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    selectedMedia = (event) => {
        this.setState({ selectedMedia: event.target.value });
    }

    handleFilmTitleChange = (e) => {
        let filmTitleTarget = e.target.value;
        this.setState({ filmTitle: filmTitleTarget });
    }

    searchOnTmdb = (event) => {
        event.preventDefault();
        // On supprime les précédents résultats
        this.setState({ searchResults: [], showResults: true, statusMessage: false })
        const filmTitle = this.state.filmTitle;
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + filmTitle
        axios.get(url
        )
            .then(response => {
                // console.log(response)
                response.data.results.map((item, i) => {
                    let filmDetail = {
                        'index': i,
                        'title': item.title,
                        'overview': item.overview,
                        'poster_path': "https://image.tmdb.org/t/p/w300" + item.poster_path,
                        'vote_average': item.vote_average,
                        'release_date': item.release_date,
                    }

                    let searchResults = this.state.searchResults

                    searchResults.push(filmDetail)
                    this.setState({ searchResults: searchResults, searchStatusMessageError: false })
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({ searchStatusMessageError: true })
            });
    }

    selectedFilm = (item) => {
        console.log(item.overview)
        // On supprime les précédents résultats
        this.setState({ searchResults: [], selectedFilm: item, showResults: false })
    }

    validSelectedFilm = (event) => {
        const selectedFilm = this.state.selectedFilm;
        const selectedMedia = this.state.selectedMedia;
        // On envoie les resultats au back
        event.preventDefault();
        console.log(selectedMedia)
        axios.post(apiUrl + 'add-film', {
            film: selectedFilm,
            media_name: selectedMedia
        })
            .then(response => {
                this.setState({ statusMessage: 'Film enregistré', statusMessageColor: 'green' });
            })
            .catch(error => {
                this.setState({ statusMessage: 'Une erreur est arrivée', statusMessageColor: 'red' });
            });
        this.getMedia();
    }

    render() {
        const searchResults = this.state.searchResults.map((item, i) => {
            if ((item.poster_path !== 'https://image.tmdb.org/t/p/w300null')) {
                return (
                    <div className="video__content__video-info" onClick={() => this.selectedFilm(item)} key={i}>
                        <img src={item.poster_path} alt="film-photo" className="video__content__video-info__img" />
                        <div className="video__content__video-info__text">
                            <span className="video__content__video-info__text__title">{item.title}</span>
                            <p className="video__content__video-info__text__overview">{item.overview.substr(0, 250)}</p>
                            <span className="video__content__video-info__text__vote">Note Tmdb: {item.vote_average} / 10</span>
                        </div>
                    </div >
                );
            }
        });
        const mediasName = this.state.medias.map((item, i) => {
            if (item.verified_by_admin) {
                return (
                    <option style={{ color: 'green' }} value={item.media_name} key={i}>{item.media_name}</option>
                );
            } else {
                return (
                    <option style={{ color: 'red' }} value={item.media_name} key={i}>{item.media_name}</option>
                );
            }
        });
        return (
            <div className="admin-video">
                <div className="admin-video__content">
                    <button onClick={this.refresh}>Actualiser</button>
                    <h2 className="admin-video__content__title">Ajouter un film</h2>
                    <form className="admin-video__content__form">
                        <div className="connexion__content__form__formgroup__id">
                            <label htmlFor="exampleInputId"> Choisir le média
                            </label>
                            <select name="medias"
                                style={{
                                    width: '100%',
                                    height: '2em'
                                }}
                                onChange={this.selectedMedia} value={this.state.selectedMedia}>
                                {mediasName}
                            </select>
                        </div>
                        <div className="admin-video__content__form__input-search">
                            <input type="text" className="admin-video__content__form__input-search__input" id="InputId" value={this.state.filmTitle} placeholder="Nom du film" onChange={this.handleFilmTitleChange} />
                        </div>

                        <div className="admin-video__content__form__submit">
                            <button className="admin-video__content__form__submit__button" onClick={this.searchOnTmdb}>
                                Rechercher
                            </button>
                        </div>
                    </form>
                    {this.state.showResults
                        ? <div className="admin-video__content__search-results">
                            {searchResults}
                            {this.state.searchStatusMessageError &&
                                <p style={{ color: 'red' }}>Aucun résultat pour cette recherche</p>
                            }
                        </div>

                        : <div className="admin-video__content__selected-film">
                            {this.state.selectedFilm &&
                                <div>
                                    <div className="video__content__video-info" onClick={() => this.selectedFilm(this.state.selectedFilm)}>
                                        <img src={this.state.selectedFilm.poster_path} alt="film-photo" className="video__content__video-info__img" />
                                        <div className="video__content__video-info__text">
                                            <span className="video__content__video-info__text__title">{this.state.selectedFilm.title}</span>
                                            <p className="video__content__video-info__text__overview">{this.state.selectedFilm.overview.substr(0, 250)}</p>
                                            <span className="video__content__video-info__text__vote">Note Tmdb: {this.state.selectedFilm.vote_average} / 10</span>
                                        </div>
                                    </div >
                                    <div className="admin-video__content__selected-film__player">
                                        <iframe
                                            allowFullScreen="alloFullScreen"
                                            height="315"
                                            src={apiUrl + "video/" + this.state.selectedMedia}
                                            width="100%"
                                            content-type="video/mkv"
                                        ></iframe>
                                    </div>
                                    <div className="admin-video__content__form__submit">
                                        <button className="admin-video__content__form__submit__button" onClick={this.validSelectedFilm}>
                                            Valider ce film
                                        </button>
                                    </div>
                                    <div className="admin-video__content__message-status">
                                        {this.state.statusMessage &&
                                            <p style={{ color: this.state.statusMessageColor }}>{this.state.statusMessage}</p>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    }


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
    console.log(state);
    return {
        // isConnect: state.user.isConnect,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Administration);

