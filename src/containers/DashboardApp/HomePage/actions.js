export const GET_ROOMS = 'BookingApp/GET_ROOMS';
export const GET_ROOMS_SUCCESS = 'BookingApp/GET_ROOMS_SUCCESS';
export const GET_ROOMS_ERROR = 'BookingApp/GET_ROOMS_ERROR';

export const GET_EVENTS = 'BookingApp/GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'BookingApp/GET_EVENTS_SUCCESS';
export const GET_EVENTS_ERROR = 'BookingApp/GET_EVENTS_ERROR';

export function getRooms() {
    return {
        type: GET_ROOMS,
    };
}

export function getRoomsSuccess(res) {
    return {
        type: GET_ROOMS_SUCCESS,
        res
    };
}

export function getRoomsError(res) {
    return {
        type: GET_ROOMS_ERROR,
        res
    };
}

export function getEvents(selectedRoom) {
    return {
        type: GET_EVENTS,
        selectedRoom
    };
}

export function getEventsSuccess(res) {
    return {
        type: GET_EVENTS_SUCCESS,
        res
    };
}

export function getEventsError(res) {
    return {
        type: GET_EVENTS_ERROR,
        res
    };
}

export const BOOK_ROOM = 'BookingApp/calendarApp/BOOK_ROOM';
export const BOOK_ROOM_SUCCESS = 'BookingApp/calendarApp/BOOK_ROOM_SUCCESS';
export const BOOK_ROOM_ERROR = 'BookingApp/calendarApp/BOOK_ROOM_ERROR';

export function bookRooms(objEventBooking) {
    return {
        type: BOOK_ROOM,
        objEventBooking
    };
}
export function bookRoomsSuccess(res) {
    return {
        type: BOOK_ROOM_SUCCESS,
        res
    };
}
export function bookRoomsError(res) {
    return {
        type: BOOK_ROOM_ERROR,
        res
    };
}