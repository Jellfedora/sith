import React, { useCallback } from 'react';
import { useCast } from 'react-chromecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CastButton() {
    const cast = useCast({
        initialize_media_player: "DEFAULT_MEDIA_RECEIVER_APP_ID",
        auto_initialize: true,
    })

    const handleClick = useCallback(async () => {
        console.log(cast.castReceiver)
        if (cast.castReceiver) {
            await cast.handleConnection();
        }
    }, [cast.castReceiver, cast.handleConnection])


    return (
        <button onClick={handleClick} className="video-player__controls__buttons">
            <FontAwesomeIcon
                icon={['fab', 'chromecast']}
                size="1x"
            />
        </button>
    )
}

export default CastButton;