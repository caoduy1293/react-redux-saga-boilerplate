import { fromJS } from 'immutable';
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
const initialState = fromJS({
    loading: false,
    error: false,
    message: '',
    authenticatedUser: null,
    userObjInput: null,
    accessToken: '',
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USER_INPUT:
            return state
                .set(GlobalStateName.userObjInput, action.userInput);

        case LOGIN:
        case AUTHENTICATE_USER:
            return state
                .set(GlobalStateName.loading, true)
                .set(GlobalStateName.message, '')
                .set(GlobalStateName.error, false);

        case LOGIN_SUCCESS:
            localStorage.setItem(LOCAL_STORAGE_ID_KEY.token, action.res.token.accessToken);
            return state
                .set(GlobalStateName.accessToken, action.res.token.accessToken)
                .set(GlobalStateName.loading, false);

        case LOGIN_FAIL:
            // console.log(action.res);
            return state
                .set(GlobalStateName.error, true)
                .set(GlobalStateName.message, 'Wrong Email or Password')
                .set(GlobalStateName.loading, false);
        case AUTHENTICATE_USER_SUCCESS:
            return state
                .set(GlobalStateName.authenticatedUser, action.res.user)
                .set(GlobalStateName.loading, false);

        case AUTHENTICATE_USER_ERROR:
            return state
                .set(GlobalStateName.error, action.error)
                .set(GlobalStateName.loading, false);

        default:
            return state;
    }
}

export default appReducer;
