import { AUTHINTICATE, LOGOUT, DID_TRY_AL } from "../action/Auth";

const initialState = {
    token: null,
    userId: null,
    tryAutoLogin: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHINTICATE:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                tryAutoLogin: true,
            };
        case LOGOUT:
            return {
                ...initialState,
                tryAutoLogin: true,
            };
        case DID_TRY_AL:
            return {
                ...state,
                tryAutoLogin: true,
            };
        default:
            return state;
    }
};

export default reducer;
