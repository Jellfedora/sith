const initialState = {
    isConnect: false,
    name: null,
    role: null
}

function userReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SAVE_USER':
            var role = parseInt(action.value.role);
            nextState = {
                ...state,
                isConnect: true,
                name: action.value.name,
                role: role
            }
            return nextState || state
        default:
            return state
    }
}

export default userReducer