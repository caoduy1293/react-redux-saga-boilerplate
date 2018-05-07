import { put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import {
    BOOK_ROOM, bookRoomsError, bookRoomsSuccess, GET_EVENTS, GET_ROOMS, getEventsError, getEventsSuccess, getRoomsError,
    getRoomsSuccess
} from "./actions";
import request from "../../../utils/request";
import {API_URL} from "../../AppRoot/constants";
import nprogress from 'nprogress';
import {toastr} from 'react-redux-toastr';

export function* getRoomsServer() {
    nprogress.start();
    try {
        const res = yield call(request, API_URL.dashboardApp.getRooms, {
            method: 'get',
        });
        yield put(getRoomsSuccess(res));
        nprogress.done();
        // toastr.success('Get Room', 'get rooms successfully !');
    } catch (error) {
        yield put(getRoomsError(error));
        nprogress.done();
        toastr.error('', 'Get rooms fail !');
    }
}


export function* getEventsServer(action) {
    nprogress.start();
    try {
        let url = API_URL.dashboardApp.getEvents.replace("{idRoom}", action.selectedRoom);
        const res = yield call(request, url, {
            method: 'get',
        });
        yield put(getEventsSuccess(res));
        nprogress.done();
        toastr.success('', 'Get events successfully !');
    } catch (error) {
        yield put(getEventsError(error));
        nprogress.done();
        toastr.error('', 'Get events fail !');
    }
}


export function* bookRoomServer(action) {
    try {
        let eventBookingObj = action.objEventBooking;
        const res = yield call(request, API_URL.dashboardApp.bookRoom, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventBookingObj),
        });
        yield put(bookRoomsSuccess(res));
        toastr.success('', 'Book room successfully !');
    } catch (error) {
        yield put(bookRoomsError(error));
        toastr.error('', 'Book room fail !');
    }
}

export function* watchGetRooms() {
    /*
      takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
      i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    */
    yield takeEvery(GET_ROOMS, getRoomsServer);
}
export function* watchGetEvents() {
    /*
      takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
      i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    */
    yield takeEvery(GET_EVENTS, getEventsServer);
}

export function* watchBookRoom() {
    /*
      takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
      i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    */
    yield takeEvery(BOOK_ROOM, bookRoomServer);
}
export default function* pageSaga() {
    yield all([
        fork(watchGetRooms),
        fork(watchGetEvents),
        fork(watchBookRoom),
    ]);
}