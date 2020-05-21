const initialState = {
    listOfVideos: null,
    titleOfVideos: null
}

function movieReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_MOVIES':
            nextState = {
                ...state,
                listOfVideos: action.value.listOfVideos,
                titleOfVideos: action.value.titleOfVideos
            }
            return nextState || state
        default:
            return state
    }
}

export default movieReducer