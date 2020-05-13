import React, { useCallback } from 'react';
import { useMedia } from 'react-chromecast';
import { useCast } from 'react-chromecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function VideoCast(videoName) {
    const mediaSrc = videoName.mediaTitle;
    const media = useMedia()

    const pauseVideo = useCallback(async () => {
        if (media) {
            await media.pause(mediaSrc);
        }
    }, [media]);

    const playVideo = useCallback(async () => {
        if (media) {
            await media.play(mediaSrc);
        }
    }, [media]);


    const launchVideo = useCallback(async () => {
        if (media) {
            await media.playMedia(mediaSrc);
        }
    });

    const cast = useCast({
        initialize_media_player: "DEFAULT_MEDIA_RECEIVER_APP_ID",
        auto_initialize: true,
    })

    const selectDevice = useCallback(async () => {
        console.log(cast.castReceiver)
        if (cast.castReceiver) {
            await cast.handleConnection();
        }

    }, [cast.castReceiver, cast.handleConnection])


    const to = useCallback(async () => {
        if (media) {
            await media.to(150);
        }
    }, [media]);

    return (
        <>
            <button onClick={launchVideo} className="video-player__cast__buttons">
                {/* La premiere fois */}
                <FontAwesomeIcon
                    icon="upload"
                    size="1x"
                />
            </button>
            <button onClick={pauseVideo} className="video-player__cast__buttons">
                <FontAwesomeIcon
                    icon="pause"
                    size="1x"
                />
            </button>
            <button onClick={playVideo} className="video-player__cast__buttons">
                <FontAwesomeIcon
                    icon="play"
                    size="1x"
                />
            </button>
            <button onClick={selectDevice} className="video-player__cast__buttons">
                <FontAwesomeIcon
                    icon="tv"
                    size="1x"
                />
            </button>
            <button onClick={to} className="video-player__cast__buttons">
                avance
            </button>
        </>
    )
}

export default VideoCast;

