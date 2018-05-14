import {GET_USERS, GET_USERS_ERROR, GET_USERS_SUCCESS} from "./actions";

export const APP_STATE_NAME = {
    loading: 'loading',
    users: 'users',
    userForm: 'userForm',
    userFormLoading: 'userForm.loading',
    userFormUserEdited: 'userForm.userEdited',
};
// The initial state of the App
const initialState = {
    loading: false,
    users: undefined,
    userForm: {
        loading: false,
        userEdited: undefined,
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        // get all users
        case GET_USERS:
            return {
                ...state,
                loading: true,
                users: undefined,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.res,
            };
        case GET_USERS_ERROR:
            return {
                ...state,
                loading: false,
                users: null,
            };
        // End - get all users

        default:
            return state;
    }
}

export default reducer;