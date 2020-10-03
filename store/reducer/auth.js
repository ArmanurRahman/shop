import { AUTHINTICATE, LOGOUT } from "../action/Auth";

const initialState = {
    token: null,
    userId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHINTICATE:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
