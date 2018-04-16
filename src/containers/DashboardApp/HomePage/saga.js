import { put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import {GET_EVENTS, GET_ROOMS, getEventsError, getEventsSuccess, getRoomsError, getRoomsSuccess} from "./actions";
import request from "../../../utils/request";
import {API_URL} from "../../AppRoot/constants";

export function* getRoomsServer() {
    try {
        const res = yield call(request, API_URL.dashboardApp.getRooms, {
            method: 'get',
        });
        yield put(getRoomsSuccess(res));
    } catch (error) {
        yield put(getRoomsError(error));
    }
}
export function* getEventsServer(action) {
    try {
        let url = API_URL.dashboardApp.getEvents.replace("{idRoom}", action.selectedRoom);
        const res = yield call(request, url, {
            method: 'get',
        });
        yield put(getEventsSuccess(res));
    } catch (error) {
        yield put(getEventsError(error));
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
export default function* pageSaga() {
    yield all([
        fork(watchGetRooms),
        fork(watchGetEvents),
    ]);
}