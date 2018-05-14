import { put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import request from "../../utils/request";
import {API_URL} from "../AppRoot/constants";
import nprogress from 'nprogress';
import {toastr} from 'react-redux-toastr';
import {
    GET_LIST_ROOMS, getListRoomsError, getListRoomsSuccess
} from "./actions";

export function* watchGetListRooms() {
    yield takeEvery(GET_LIST_ROOMS, getListRoomsServer);
}

export function* getListRoomsServer() {
    nprogress.start();
    try {
        const res = yield call(request, API_URL.dashboardApp.getRooms, {
            method: 'get',
        });
        yield put(getListRoomsSuccess(res));
        nprogress.done();
        toastr.success('Get Rooms', 'The request successfully');
    } catch (error) {
        yield put(getListRoomsError(error));
        nprogress.done();
        toastr.error('Get Rooms', 'The Request fail');
    }
}

export default function* pageSaga() {
    yield all([
        fork(watchGetListRooms),
    ]);
}