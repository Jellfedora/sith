const initialState = {
    isConnect: false,
    name: null,
    role: null,
    token: null,
    id: null
}

function userReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SAVE_USER':
            console.log(action.value)
            nextState = {
                ...state,
                isConnect: true,
                name: action.value.userName,
                role: action.value.userRole,
                token: action.value.userToken
            }
            return nextState || state
        default:
            return state
    }
}

export default userReducer