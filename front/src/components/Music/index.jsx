import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
// import defaultCover from '../../ressources/images/default-cover.jpg';
const apiUrl = process.env.REACT_APP_REST_API;

let audio = null;

class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectedTrack: null,
            listOfSongs: [],
            playerStatus: "stopped",
            songIsCharged: false,
            currentTime: "0:00",
            duration: "0:00",
            songTitle: '',
            source: null,
            showMusicFolder: true,
            listOfFolders: [],
            openFolder: null,
            reloadAlbum: false,
            reloadSong: false,
            randomSong: false,
            isFirstSongOfAlbulm: false
        };
    }
    componentDidMount() {
        // Get all music folders
        this.getAllFolders();
        // Get the image album
        this.getAlbumImg()
        // Get all songs list
        // this.getAllSongs();
    }
    componentDidUpdate(prevProps, prevState) {
        // TODO gérer le passage à la chanson suivante en fin de la précédente
        if (this.state.songIsCharged) {
            audio.onended = () => {
                this.playNextSong();
            }
        }
    }

    // TODO Gérer le retour sur la home quand une musique est jouée (musique continue mais controle broken)

    activeRandomSong = () => {
        if (this.state.randomSong) {
            this.setState({ randomSong: false });
        } else {
            this.setState({ randomSong: true, reloadSong: false, reloadAlbum: false });
        }
    }

    activeReloadSong = () => {
        if (this.state.reloadSong) {
            this.setState({ reloadSong: false });
        } else {
            this.setState({ reloadSong: true, reloadAlbum: false, randomSong: false });
        }
    }

    activeReloadAlbum = () => {
        if (this.state.reloadAlbum) {
            this.setState({ reloadAlbum: false });
        } else {
            this.setState({ reloadAlbum: true, reloadSong: false, randomSong: false });
        }
    }

    playNextSong = () => {
        // Si le reload de la chanson en cours est activé
        if (this.state.reloadSong) {
            // On remet le compteur à zéro
            audio.currentTime = 0
            audio.play()
        } else if (this.state.randomSong) {
            var max = Math.floor(this.state.listOfSongs.length - 1);
            var randomIndexSong = Math.floor(Math.random() * (max - 0)) + 0;
            this.getStream(this.state.listOfSongs[randomIndexSong]);
        } else {
            // Récupérer lindex de la chanson actuelle dans listOfSongs
            var indexOfActualSong = this.state.listOfSongs.indexOf(this.state.songTitle)

            var nextSongName = this.state.listOfSongs[indexOfActualSong + 1];

            // Stopper si c'est la derniére chanson de la liste
            var countOfIndex = this.state.listOfSongs.length - 1;
            if (indexOfActualSong + 1 <= countOfIndex) {
                // Envoyer la chanson suivante
                this.getStream(nextSongName);
            }
            // Todo revenir à la premiére chanson si activé
            else if (this.state.reloadAlbum) {
                // On envoie le titre de la premiére chanson de l'album
                this.getStream(this.state.listOfSongs[0]);
            }
        }

    }

    // Get album Img^^
    getAlbumImg() {
        axios.get(
            apiUrl + 'img/',
            { responseType: 'arraybuffer' },
        )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({ source: "data:;base64," + base64 });
            });
    }

    getStream(selectedTrack) {
        if (this.state.songIsCharged) {
            audio.pause() //Stop the former song
        }

        this.setState({ songIsCharged: true, songTitle: selectedTrack, playerStatus: 'playing' });

        audio = new Audio(apiUrl + 'play/' + this.state.openFolder + '/' + selectedTrack);
        audio.play();
        audio.ontimeupdate = () => {
            this.getCurrentTime()
        }

    }

    openFolder(selectedFolder) {
        axios.get(apiUrl + 'get-folder-songs/' + selectedFolder
        )
            .then(response => {
                console.log(response.data)
                this.setState({
                    listOfSongs: response.data.repertorySongs,
                    repertoryImg: response.data.repertoryImg,
                    showMusicFolder: false,
                    openFolder: selectedFolder
                })
            })
            .catch(error => {
                // this.setState({ loadSpinner: false });
            });
    }

    getAllFolders = () => {
        axios.get(apiUrl + 'music/folder'
        )
            .then(response => {
                console.log(response)
                this.setState({ listOfFolders: response.data })
            })
            .catch(error => {
                // this.setState({ loadSpinner: false });
            });
    }

    getAllSongs = () => {
        axios.get(apiUrl + 'get-all-songs/'
        )
            .then(response => {
                console.log(response)
                this.setState({ listOfSongs: response.data.repertorySongs, repertoryImg: response.data.repertoryImg })
            })
            .catch(error => {
                // this.setState({ loadSpinner: false });
            });
    }

    // Play / Pause 
    changePlayerState = () => {
        if (this.state.playerStatus === "paused") {
            audio.play();
            this.setState({ playerStatus: 'playing' })
        } else {
            audio.pause();
            this.setState({ playerStatus: 'paused' })
        }
    }

    backward() {
        audio.currentTime = audio.currentTime - 10;
    }

    forward() {
        audio.currentTime = audio.currentTime + 10;
    }

    fastBackward = () => {
        // Récupérer lindex de la chanson actuelle dans listOfSongs
        var indexOfActualSong = this.state.listOfSongs.indexOf(this.state.songTitle)

        var nextSongName = this.state.listOfSongs[indexOfActualSong - 1];

        // Stopper si c'est la derniére chanson de la liste
        if (indexOfActualSong - 1 >= 0) {
            // Envoyer la chanson suivante
            this.getStream(nextSongName);
        }
    }

    fastForward = () => {
        // Récupérer lindex de la chanson actuelle dans listOfSongs
        var indexOfActualSong = this.state.listOfSongs.indexOf(this.state.songTitle)

        var nextSongName = this.state.listOfSongs[indexOfActualSong + 1];

        // Stopper si c'est la derniére chanson de la liste
        var countOfIndex = this.state.listOfSongs.length - 1;
        if (indexOfActualSong + 1 <= countOfIndex) {
            // Envoyer la chanson suivante
            this.getStream(nextSongName);
        }
        // Todo revenir à la premiére chanson si activé
        else {
            // On envoie le titre de la premiére chanson de l'album
            this.getStream(this.state.listOfSongs[0]);
        }
    }

    // OKK
    getTime(time) {
        if (!isNaN(time)) {
            return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        }
    }

    // OKK
    getCurrentTime() {
        if (this.state.songIsCharged === true) {
            var currentTime = Math.floor(audio.currentTime / 60) + ':' + ('0' + Math.floor(audio.currentTime % 60)).slice(-2)
            this.setState({ currentTime: currentTime })



            // TODO A deplacer
            // Définit si c'est la premiére chanson de la liste
            if (this.state.listOfSongs.indexOf(this.state.songTitle) === 0) {
                this.setState({ isFirstSongOfAlbulm: true });
            } else {
                this.setState({ isFirstSongOfAlbulm: false });
            }
        }
    }

    // OKK
    getDuration() {
        if (this.state.songIsCharged === true) {
            let duration = Math.floor(audio.duration / 60) + ':' + ('0' + Math.floor(audio.duration % 60)).slice(-2);
            if (isNaN(audio.duration)) {
                return ""
            } else {
                return duration;
            }
        }
    }

    render() {
        const openFolder = this.state.openFolder;
        const songTitle = this.state.songTitle;
        // const songImg = this.state.source;
        const currentTime = this.state.currentTime;
        const duration = this.getDuration();
        const listOfFolders = this.state.listOfFolders.map((item, i) => {
            return (
                <div
                    className="music__folder__folder-title"
                    key={i}
                    onClick={() => this.openFolder(item)}>
                    <span>{item}</span>
                </div>
            );
        });
        const listOfSongs = this.state.listOfSongs.map((item, i) => {
            return (
                <div
                    className="music__list__song-title"
                    key={i}
                    onClick={() => this.getStream(item)}
                >
                    <span>{item}</span>

                </div>
            )
        });

        return (
            <div className="music">
                {this.state.showMusicFolder ? (
                    <div className="music__folder">
                        {/* TODO Ajouter titre */}
                        {listOfFolders}
                    </div>
                ) : (
                        <div className="music__list">
                            {/* TODO Ajouter titre */}
                            {listOfSongs}
                        </div>
                    )}
                <div className="music__player">
                    <div className="music__player__song-information">
                        <div className="music__player__song-information__content">
                            <span className="music__player__song-information__content__song-title">{songTitle}</span>
                            <span className="music__player__song-information__content__album-title">{openFolder}</span>
                        </div>
                    </div>
                    <div className="music__player__timer">
                        {this.state.playerStatus === "playing" || this.state.playerStatus === "paused" ? (
                            <div className="music__player__timer__currentime">
                                <span>
                                    {currentTime} / {duration}
                                </span>
                            </div>
                        ) : (
                                <div className="music__player__timer__currentime">
                                    <span>
                                        0:00 / 0:00
                                </span>
                                </div>
                            )}
                        <div className="music__player__timer__song-options">
                            <button className={"music__player__timer__song-options__reload-button " + (this.state.randomSong ? 'isCheck' : '')} onClick={this.activeRandomSong}>
                                <FontAwesomeIcon
                                    icon="random"
                                />
                            </button>
                            <button className={"music__player__timer__song-options__reload-button " + (this.state.reloadSong ? 'isCheck' : '')} onClick={this.activeReloadSong}>
                                <FontAwesomeIcon
                                    icon="retweet"
                                />
                                <span className="music__player__timer__song-options__reload-button__reload-song-span">1</span>
                            </button>
                            <button className={"music__player__timer__song-options__reload-button " + (this.state.reloadAlbum ? 'isCheck' : '')} onClick={this.activeReloadAlbum}>
                                <FontAwesomeIcon
                                    icon="retweet"
                                />
                                <span className="music__player__timer__song-options__reload-button__reload-song-span">all</span>
                            </button>
                            <button className={"music__player__timer__song-options__cast-button "} onClick={() => this.setState({ showMusicFolder: true })}>
                                <FontAwesomeIcon
                                    icon={['fab', 'chromecast']}
                                />
                            </button>
                        </div>
                    </div>


                    <div className="music__player__control">
                        <div className="music__player__control__buttons">
                            {this.state.isFirstSongOfAlbulm
                                ? <button disabled className="music__player__control__buttons__button music__player__control__button__back isDisabled" onClick={this.fastBackward}>
                                    <FontAwesomeIcon
                                        icon="fast-backward"
                                    />
                                </button>
                                : <button className="music__player__control__buttons__button music__player__control__button__back" onClick={this.fastBackward}>
                                    <FontAwesomeIcon
                                        icon="fast-backward"
                                    />
                                </button>
                            }
                            <button className="music__player__control__buttons__button music__player__control__button__back" onClick={this.backward}>
                                <FontAwesomeIcon
                                    icon="backward"
                                />
                            </button>
                            {this.state.playerStatus === "stopped" || this.state.playerStatus === "paused"
                                ? <button className="music__player__control__buttons__button" onClick={this.changePlayerState}>
                                    <FontAwesomeIcon
                                        icon="play"
                                        size="1x"
                                    />
                                </button>
                                : <button className="music__player__control__buttons__button" onClick={this.changePlayerState}>
                                    <FontAwesomeIcon
                                        icon="pause"
                                        size="1x"
                                    />
                                </button>
                            }

                            <button className="music__player__control__buttons__button music__player__control__button__next" onClick={this.forward}>
                                <FontAwesomeIcon
                                    icon="forward"
                                />
                            </button>
                            <button className="music__player__control__buttons__button music__player__control__button__next" onClick={this.fastForward}>
                                <FontAwesomeIcon
                                    icon="fast-forward"
                                />
                            </button>
                            {/* <button className="music__player__control__button" onClick={() => this.setState({ playerStatus: "stopped" })}>
                            <FontAwesomeIcon
                                icon="stop"
                            />
                        </button> */}
                        </div>

                        {/* <div className="music__player__control__song-options">
                            <button className={"music__player__control__song-options__reload-button " + (this.state.randomSong ? 'isCheck' : '')} onClick={this.activeRandomSong}>
                                <FontAwesomeIcon
                                    icon="random"
                                />
                            </button>
                            <button className={"music__player__control__song-options__reload-button " + (this.state.reloadSong ? 'isCheck' : '')} onClick={this.activeReloadSong}>
                                <FontAwesomeIcon
                                    icon="retweet"
                                />
                                <span className="music__player__control__song-options__reload-button__reload-song-span">1</span>
                            </button>
                            <button className={"music__player__control__song-options__reload-button " + (this.state.reloadAlbum ? 'isCheck' : '')} onClick={this.activeReloadAlbum}>
                                <FontAwesomeIcon
                                    icon="retweet"
                                />
                                <span className="music__player__control__song-options__reload-button__reload-song-span">all</span>
                            </button>
                        </div> */}

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
        // isStart: state.home.isStart,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Music);
















