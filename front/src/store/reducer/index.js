import { combineReducers } from 'redux';
import server from './server-reducer';
import user from './user-reducer';

const rootReducer = combineReducers({
    server,
    user
});

export default rootReducer;