import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
            searchStatusMessageError: false,
            tmdbGenres: undefined,
            selectedFile: null
        };
    }

    componentDidMount() {
        this.getMedia();
    }

    componentDidUpdate() {
    }

    refresh = (event) => {
        const config = {
            headers: { Authorization: `Bearer ${this.props.userToken}` }
        };
        axios.get(apiUrl + 'check-films', config
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
        this.setState({ medias: [] })
        const config = {
            headers: { Authorization: `Bearer ${this.props.userToken}` }
        };
        axios.get(apiUrl + 'admin-all-films', config
        )
            .then(response => {
                response.data.map((item, i) => {
                    let filmDetail = {
                        'media_name': item.media_name,
                        'verified_by_admin': item.verified_by_admin
                    }

                    let medias = this.state.medias;
                    medias.push(filmDetail)
                    this.setState({ medias: medias, selectedMedia: response.data[0].media_name })
                    return true;
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    selectedMedia = (event) => {
        this.setState({ selectedMedia: event.target.value, filmTitle: event.target.value });
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
        axios.get(url)
            .then(response => {
                console.log(response)
                response.data.results.map((item, i) => {
                    let filmDetail = {
                        'index': i,
                        'genre_ids': item.genre_ids,
                        'title': item.title,
                        'overview': item.overview,
                        'poster_path': "https://image.tmdb.org/t/p/w300" + item.poster_path,
                        'vote_average': item.vote_average,
                        'release_date': item.release_date,
                    }

                    let searchResults = this.state.searchResults

                    searchResults.push(filmDetail)
                    this.setState({ searchResults: searchResults, searchStatusMessageError: false })
                    return true;
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({ searchStatusMessageError: true })
            });

        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_TOKEN + '&language=fr')
            .then(response => {
                this.setState({ tmdbGenres: response.data.genres })
            })
            .catch(error => {
                console.log(error)
            });
    }

    selectedFilm = (item) => {
        // On récupére les genres du film
        const selectedFilmGenres = item.genre_ids;
        const genres = this.state.tmdbGenres;
        const selectedFilmGenresNames = [];
        genres.forEach((genre) => {
            if (selectedFilmGenres.indexOf(genre.id) !== -1) {
                selectedFilmGenresNames.push(genre.name)
            }
        })
        console.log(item)

        const selectedFilm = {
            title: item.title,
            poster_path: item.poster_path,
            release_date: item.release_date,
            genres_name: selectedFilmGenresNames,
            overview: item.overview,
            vote_average: item.vote_average
        }

        // On supprime les précédents résultats
        this.setState({ searchResults: [], selectedFilm: selectedFilm, showResults: false })
    }

    validSelectedFilm = (event) => {
        const selectedFilm = this.state.selectedFilm;
        const selectedMedia = this.state.selectedMedia;
        // On envoie les resultats au back
        event.preventDefault();
        console.log(selectedMedia)
        const headers = {
            "Authorization": `Bearer ${this.props.userToken}`
        };
        const data = {
            film: selectedFilm,
            media_name: selectedMedia
        };
        axios.post(apiUrl + 'add-film', data, { "headers": headers })
            .then(response => {
                this.setState({ statusMessage: 'Film enregistré', statusMessageColor: 'green' });
            })
            .catch(error => {
                this.setState({ statusMessage: 'Une erreur est arrivée', statusMessageColor: 'red' });
            });
        this.getMedia();
    }

    // Upload
    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );




        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        const headers = {
            "Authorization": `Bearer ${this.props.userToken}`,
            "encType": "multipart/form-data",
        };

        axios.post(apiUrl + 'upload-film', formData, { "headers": headers })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    };

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        const searchResults = this.state.searchResults.map((item, i) => {
            if ((item.poster_path !== 'https://image.tmdb.org/t/p/w300null')) {
                return (
                    <div className="video__content__video-info" onClick={() => this.selectedFilm(item)} key={i}>
                        <img src={item.poster_path} alt="film-poster" className="video__content__video-info__img" />
                        <div className="video__content__video-info__text">
                            <span className="video__content__video-info__text__title">{item.title}</span>
                            <p className="video__content__video-info__text__overview">{item.overview.substr(0, 250)}</p>
                            <span className="video__content__video-info__text__vote">Note Tmdb: {item.vote_average} / 10</span>
                        </div>
                    </div >
                );
            } else {
                return false
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
                            <input autoComplete="off" type="text" className="admin-video__content__form__input-search__input" id="InputId" value={this.state.filmTitle} placeholder="Nom du film" onChange={this.handleFilmTitleChange} />
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
                                        <img src={this.state.selectedFilm.poster_path} alt="film-poster" className="video__content__video-info__img" />
                                        <div className="video__content__video-info__text">
                                            <span className="video__content__video-info__text__title">{this.state.selectedFilm.title}</span>
                                            <p className="video__content__video-info__text__overview">{this.state.selectedFilm.overview.substr(0, 250)}</p>
                                            <span className="video__content__video-info__text__vote">Note Tmdb: {this.state.selectedFilm.vote_average} / 10</span>
                                        </div>
                                    </div >
                                    <div className="admin-video__content__selected-film__player">
                                        <iframe
                                            title="video-player"
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
                <h3>
                    Upload Film (finira dans le dossier video path)
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()}

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
        userToken: state.user.token
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Administration);

