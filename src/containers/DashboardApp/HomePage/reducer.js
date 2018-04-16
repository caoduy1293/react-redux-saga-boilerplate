import {fromJS} from "immutable";
import {
    GET_EVENTS, GET_EVENTS_ERROR, GET_EVENTS_SUCCESS, GET_ROOMS, GET_ROOMS_ERROR,
    GET_ROOMS_SUCCESS
} from "./actions";

export const HomePageStateName = {
    loading: 'loading',
    error: 'error',
    message: 'message',
    rooms: 'rooms',
    events: 'events',
    selectedRoom: 'selectedRoom',
};

// The initial state of the App
const initialState = fromJS({
    loading: false,
    error: false,
    message: '',
    rooms: null,
    selectedRoom: '',
    events: null,
});

function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS:
            return state
                .set(HomePageStateName.loading, true)
                .set(HomePageStateName.message, '')
                .set(HomePageStateName.error, false)
                .set(HomePageStateName.rooms, null);
        case GET_ROOMS_SUCCESS:
            return state
                .set(HomePageStateName.loading, false)
                .set(HomePageStateName.rooms, action.res);
        case GET_ROOMS_ERROR:
            return state
                .set(HomePageStateName.loading, false)
                .set(HomePageStateName.message, 'Get Rooms Fail !')
                .set(HomePageStateName.error, true)
                .set(HomePageStateName.rooms, []);
        case GET_EVENTS:
            return state
                .set(HomePageStateName.loading, true)
                .set(HomePageStateName.message, '')
                .set(HomePageStateName.error, false)
                .set(HomePageStateName.selectedRoom, action.selectedRoom)
                .set(HomePageStateName.events, null);
        case GET_EVENTS_SUCCESS:
            return state
                .set(HomePageStateName.loading, false)
                .set(HomePageStateName.events, action.res);
        case GET_EVENTS_ERROR:
            return state
                .set(HomePageStateName.loading, false)
                .set(HomePageStateName.message, 'Get Events Fail !')
                .set(HomePageStateName.error, true)
                .set(HomePageStateName.events, []);

        default:
            return state;
    }
}

export default homePageReducer;