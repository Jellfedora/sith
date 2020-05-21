import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.myVideo = React.createRef();
        this.state = {
            video: null,
            isPlay: true,
            duration: "0:00",
            currentTime: "0:00",
        };
    }
    componentDidMount = () => {
        this.setState({ video: document.getElementById('video-player') })
        this.toggleFullScreen()
    };

    componentDidUpdate = () => {
        // Event
        this.state.video.ontimeupdate = () => {
            this.getCurrentTime()
            this.getDuration()
        }
        this.state.video.onplay = () => {
            this.setState({ isPlay: true })
        }
        this.state.video.onpause = () => {
            this.setState({ isPlay: false })
        }


        // this.state.video.currentTime = this.state.currentTimeCookie['currentime'];
    }

    componentWillUnmount = () => {
        this.pauseVideo();
    };


    setCookie = () => {
        if (this.state.video) {

        }
    }



    getCurrentTime = () => {
        let currentTime = this.convertSeconds(this.state.video.currentTime)
        this.setState({ currentTime: currentTime })
    }

    getDuration() {
        let duration = this.convertSeconds(this.state.video.duration)
        this.setState({ duration: duration })
    }

    convertSeconds = (seconds) => {
        var sec_num = parseInt(seconds, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    playVideo = () => {
        this.refs.vidRef.play();
        this.setState({ isPlay: true })

    };

    pauseVideo = () => {
        if (this.refs.vidRef) {
            // Pause as well
            this.refs.vidRef.pause();
            this.refs.vidRef.removeAttribute('src'); // empty source
            this.refs.vidRef.load();
            this.setState({ isPlay: false })
        }
    };

    toggleFullScreen = () => {
        if (this.myVideo.current.requestFullscreen) {
            this.myVideo.current.requestFullscreen();
        } else if (this.myVideo.current.msRequestFullscreen) {
            this.myVideo.current.msRequestFullscreen();
        } else if (this.myVideo.current.mozRequestFullScreen) {
            this.myVideo.current.mozRequestFullScreen();
        } else if (this.myVideo.current.webkitRequestFullscreen) {
            this.myVideo.current.webkitRequestFullscreen();
        }
    };

    render = () => {
        return (
            <div className="video-player">
                <video
                    id='video-player'
                    autoPlay
                    controls
                    className="video-player__screen"
                    ref={this.myVideo}
                    src={this.props.mediaTitle}
                    type="video/mp4"
                />
                {/* <div className="video-player__controls">
                    {this.state.isPlay
                        ?
                        <button onClick={this.pauseVideo} className="video-player__controls__buttons">
                            <FontAwesomeIcon
                                icon="pause"
                                size="1x"
                            />
                        </button>
                        :
                        <button onClick={this.playVideo} className="video-player__controls__buttons">
                            <FontAwesomeIcon
                                icon="play"
                                size="1x"
                            />
                        </button>
                    }

                    <div className="video-player__controls__currentime">
                        <span>
                            {this.state.currentTime} / {this.state.duration}
                        </span>
                    </div>
                    <button onClick={this.toggleFullScreen} className="video-player__controls__buttons">
                        <FontAwesomeIcon
                            icon="compress"
                            size="1x"
                        />
                    </button>
                </div> */}



            </div>
        );
    };
}

export default VideoPlayer;
