import {GET_LIST_ROOMS, GET_LIST_ROOMS_ERROR, GET_LIST_ROOMS_SUCCESS} from "./actions";

export const APP_STATE_NAME = {
    loading: 'loading',
    rooms: 'rooms',
    roomForm: 'roomForm',
    roomFormLoading: 'roomForm.loading',
    roomFormData: 'roomForm.roomData',
};
// The initial state of the App
const initialState = {
    loading: false,
    rooms: undefined,
    roomForm: {
        loading: false,
        roomData: undefined,
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        // get all users
        case GET_LIST_ROOMS:
            return {
                ...state,
                loading: true,
                rooms: undefined,
            };
        case GET_LIST_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: action.res,
            };
        case GET_LIST_ROOMS_ERROR:
            return {
                ...state,
                loading: false,
                rooms: null,
            };
        // End - get all users

        default:
            return state;
    }
}

export default reducer;