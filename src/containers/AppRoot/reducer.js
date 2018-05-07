import {
    AUTHENTICATE_USER, AUTHENTICATE_USER_ERROR, AUTHENTICATE_USER_SUCCESS, CHANGE_USER_INPUT,
    LOGIN, LOGIN_FAIL, LOGIN_SUCCESS,
} from './actions';
import {LOCAL_STORAGE_ID_KEY} from "./constants";

/**
 * this need to by syns with initialState object field name
 */
export const GlobalStateName = {
    loading: 'loading',
    error: 'error',
    message: 'message',
    authenticatedUser: 'authenticatedUser',
    userObjInput: 'userObjInput',
    accessToken: 'accessToken',
};

// The initial state of the App
const initialState = {
    loading: false,
    error: false,
    message: '',
    authenticatedUser: null,
    userObjInput: null,
    accessToken: '',
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USER_INPUT:
            return {
                ...state,
                userObjInput: action.userInput
            };

        case LOGIN:
        case AUTHENTICATE_USER:
            return {
                ...state,
                loading: true,
                message: '',
                error: false,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem(LOCAL_STORAGE_ID_KEY.token, action.res.token.accessToken);
            return {
                ...state,
                accessToken: action.res.token.accessToken,
                loading: false,
            };
        case LOGIN_FAIL:
            // console.log(action.res);
            return {
                ...state,
                loading: false,
                error: true,
                message: 'Wrong Email or Password',
            };
        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                authenticatedUser: action.res.user,
            };

        case AUTHENTICATE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
}

export default appReducer;
