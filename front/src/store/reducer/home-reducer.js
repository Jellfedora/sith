const initialState = {
    isStart: false,
}

function homeReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CLICK':
            nextState = {
                ...state,
                isStart: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default homeReducer