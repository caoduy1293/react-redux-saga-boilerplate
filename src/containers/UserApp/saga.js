import { put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import request from "../../utils/request";
import {API_URL} from "../AppRoot/constants";
import nprogress from 'nprogress';
import {toastr} from 'react-redux-toastr';
import {GET_USERS, getUsersError, getUsersSuccess} from "./actions";

export function* watchGetUsers() {
    yield takeEvery(GET_USERS, getUsersServer);
}

export function* getUsersServer() {
    nprogress.start();
    try {
        const res = yield call(request, API_URL.userApp.getUsers, {
            method: 'get',
        });
        yield put(getUsersSuccess(res));
        nprogress.done();
        // toastr.success('Get User', 'The request successfully');
    } catch (error) {
        yield put(getUsersError(error));
        nprogress.done();
        toastr.error('Get User', 'The Request fail');
    }
}

export default function* pageSaga() {
    yield all([
        fork(watchGetUsers),
    ]);
}