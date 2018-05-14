export const GET_USERS = 'BookingApp/GET_USERS';
export const GET_USERS_SUCCESS = 'BookingApp/GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'BookingApp/GET_USERS_ERROR';

export function getUsers() {
    return {
        type: GET_USERS,
    };
}

export function getUsersSuccess(res) {
    return {
        type: GET_USERS_SUCCESS,
        res
    };
}
export function getUsersError(res) {
    return {
        type: GET_USERS_ERROR,
        res
    };
}
