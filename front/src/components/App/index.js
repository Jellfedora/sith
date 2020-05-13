import React from 'react';
// Import Redux Store
import { Provider } from "react-redux";
import store from '../../store';
// Import Sass
import "../../styles/index.scss";
// Import Components
import Navigation from "../Navigation";

// Fontawesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faStop, faFastForward, faFastBackward, faPause, faChevronLeft, faRetweet, faRandom, faForward, faBackward, faEye, faEyeSlash, faSpinner, faTimesCircle, faCompress, faTv, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faChromecast, } from '@fortawesome/free-brands-svg-icons'; //For brand icons
library.add(faPlay, faStop, faFastForward, faFastBackward, faPause, faChevronLeft, faRetweet, faRandom, faForward, faBackward, faChromecast, faEye, faEyeSlash, faSpinner, faTimesCircle, faCompress, faTv, faUpload);

const App = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};
export default App;