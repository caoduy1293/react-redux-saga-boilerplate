export const AUTHENTICATE_USER = 'bookingApp/AUTHENTICATE_USER';
export const AUTHENTICATE_USER_SUCCESS = 'bookingApp/AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_ERROR = 'bookingApp/AUTHENTICATE_USER_ERROR';

export const CHANGE_USER_INPUT = 'Authorization App - change user input';
export const LOGIN = 'Authorization App - login';
export const LOGIN_SUCCESS = 'Authorization App - login successfully';
export const LOGIN_FAIL = 'Authorization App - login fail';

export function authenticateUser() {
    return {
        type: AUTHENTICATE_USER,
    };
}
export function authenticateUserSuccess(res) {
    return {
        type: AUTHENTICATE_USER_SUCCESS,
        res,
    };
}

export function authenticateUserError(res) {
    return {
        type: AUTHENTICATE_USER_ERROR,
        res,
    };
}


export function changeUserInput(userInput) {
    return {
        type: CHANGE_USER_INPUT,
        userInput,
    };
}

export function loginToSystem() {
    return {
        type: LOGIN,
    };
}
export function loginSuccess(res) {
    return {
        type: LOGIN_SUCCESS,
        res,
    };
}
export function loginFail(res) {
    return {
        type: LOGIN_FAIL,
        res,
    };
}
