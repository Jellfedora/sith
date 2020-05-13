import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CastProvider from 'react-chromecast';
import CastButton from '../CastButton';
import VideoCast from '../VideoCast';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCast: false,
        };
    }
    componentDidMount = () => {
    };

    componentWillUnmount = () => {
        this.pauseVideo();
    };


    playVideo = () => {
        this.refs.vidRef.play();
        this.toggleFullScreen()
    };

    pauseVideo = () => {
        if (this.refs.vidRef) {
            // Pause as well
            this.refs.vidRef.pause();

        }
    };

    toggleFullScreen = () => {
        if (this.refs.vidRef.requestFullscreen) {
            this.refs.vidRef.requestFullscreen();
        } else if (this.refs.vidRef.msRequestFullscreen) {
            this.refs.vidRef.msRequestFullscreen();
        } else if (this.refs.vidRef.mozRequestFullScreen) {
            this.refs.vidRef.mozRequestFullScreen();
        } else if (this.refs.vidRef.webkitRequestFullscreen) {
            this.refs.vidRef.webkitRequestFullscreen();
        }
    };

    cast = () => {
        this.setState({ isCast: true })
    };

    render = () => {
        return (
            <div className="video-player">
                {!this.state.isCast &&
                    <video
                        className="video-player__screen"
                        ref="vidRef"
                        src={this.props.mediaTitle}
                        type="video/mp4"
                    />

                }

                {!this.state.isCast
                    ?
                    <div className="video-player__controls">
                        <button onClick={this.playVideo} className="video-player__controls__buttons">
                            <FontAwesomeIcon
                                icon="play"
                                size="1x"
                            />
                        </button>
                        <button onClick={this.pauseVideo} className="video-player__controls__buttons">
                            <FontAwesomeIcon
                                icon="pause"
                                size="1x"
                            />
                        </button>
                        <button onClick={this.toggleFullScreen} className="video-player__controls__buttons">
                            <FontAwesomeIcon
                                icon="compress"
                                size="1x"
                            />
                        </button>
                        <button onClick={this.cast} className="video-player__controls__buttons">
                            <FontAwesomeIcon
                                icon={['fab', 'chromecast']}
                                size="1x"
                            />
                        </button>
                    </div>
                    :
                    <div className="video-player__cast">
                        < CastProvider >
                            <VideoCast mediaTitle={this.props.mediaTitle} />
                        </ CastProvider >
                    </div>

                }



            </div>
        );
    };
}

export default VideoPlayer;
