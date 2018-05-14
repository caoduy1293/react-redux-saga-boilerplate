export const GET_LIST_ROOMS = 'BookingApp/RoomApp/GET_LIST_ROOMS';
export const GET_LIST_ROOMS_SUCCESS = 'BookingApp/RoomApp/GET_LIST_ROOMS_SUCCESS';
export const GET_LIST_ROOMS_ERROR = 'BookingApp/RoomApp/GET_LIST_ROOMS_ERROR';

export function getListRooms() {
    return {
        type: GET_LIST_ROOMS,
    };
}

export function getListRoomsSuccess(res) {
    return {
        type: GET_LIST_ROOMS_SUCCESS,
        res
    };
}
export function getListRoomsError(res) {
    return {
        type: GET_LIST_ROOMS_ERROR,
        res
    };
}
