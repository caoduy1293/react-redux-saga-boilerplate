import {
    BOOK_ROOM, BOOK_ROOM_ERROR, BOOK_ROOM_SUCCESS,
    GET_EVENTS, GET_EVENTS_ERROR, GET_EVENTS_SUCCESS, GET_ROOMS, GET_ROOMS_ERROR,
    GET_ROOMS_SUCCESS
} from "./actions";

export const HomePageStateName = {
    loading: 'loading',
    rooms: 'rooms',
    events: 'events',
    selectedRoom: 'selectedRoom',
    eventBookingForm: 'eventBookingForm',
    eventBookingFormLoading: 'eventBookingForm.loading',
    eventBookingFormDataCreate: 'eventBookingForm.eventCreate',
};
// The initial state of the App
const initialState = {
    loading: false,
    rooms: null,
    selectedRoom: '',
    events: null,
    eventBookingForm: {
        loading: false,
        eventCreate: undefined,
    }
};

function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                loading: true,
                rooms: null,
            };
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: action.res,
            };
        case GET_ROOMS_ERROR:
            return {
                ...state,
                loading: false,
                rooms:[],
            };
        case GET_EVENTS:
            return {
                ...state,
                loading: true,
                events: null,
                selectedRoom: action.selectedRoom,
            };
        case GET_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.res,
            };
        case GET_EVENTS_ERROR:
            return {
                ...state,
                loading: false,
                events: [],
            };

        //Event booking form
        case BOOK_ROOM:
            return {
                ...state,
                eventBookingForm: {
                    ...state.eventBookingForm,
                    loading: true,
                    eventCreate: undefined,
                }
            };
        case BOOK_ROOM_SUCCESS:
            return {
                ...state,
                eventBookingForm: {
                    ...state.eventBookingForm,
                    eventCreate: action.res,
                    loading: false,
                }
            };
        case BOOK_ROOM_ERROR:
            return {
                ...state,
                eventBookingForm: {
                    ...state.eventBookingForm,
                    loading: false,
                    eventCreate: null,
                }
            };


        default:
            return state;
    }
}

export default homePageReducer;