import { combineReducers } from 'redux';
import server from './server-reducer';
import user from './user-reducer';
import animations from './animations-reducer';
import movie from './movie-reducer';

const rootReducer = combineReducers({
    server,
    user,
    animations,
    movie,
});

export default rootReducer;