const initialState = {
    loaderStart: false,
}

function animationsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'LOADER_START':
            nextState = {
                ...state,
                loaderStart: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default animationsReducer