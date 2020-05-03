const initialState = {
    isStart: false,
}

function serverReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SERVER_IS_START':
            nextState = {
                ...state,
                isStart: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default serverReducer