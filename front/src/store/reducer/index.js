import { combineReducers } from 'redux';
import server from './server-reducer';
import user from './user-reducer';
import animations from './animations-reducer';

const rootReducer = combineReducers({
    server,
    user,
    animations
});

export default rootReducer;