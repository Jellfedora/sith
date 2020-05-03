const initialState = {
    isConnect: false,
    identifiant: null,
    role: null
}

function userReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SAVE_USER':
            nextState = {
                ...state,
                isConnect: true,
                identifiant: action.value.identifiant,
                role: action.value.role
            }
            return nextState || state
        default:
            return state
    }
}

export default userReducer