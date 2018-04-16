import { put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import { push } from "react-router-redux";

import {
    AUTHENTICATE_USER, AUTHENTICATE_USER_SUCCESS, LOGIN,
    LOGIN_SUCCESS
} from './actions';
import request from '../../utils/request';
import { authenticateUserError, authenticateUserSuccess, loginFail, loginSuccess } from './actions';
import { getUserLoginInput } from './selectors';
import {API_URL} from "./constants";

export function* authToSystem() {
    try {
        const res = yield call(request, API_URL.authApp.me, {
            method: 'post',
        });
        yield put(authenticateUserSuccess(res));
    } catch (error) {
        yield put(authenticateUserError(error));
    }
}

export function* authToSystemSuccess() {
    yield put(push('/'));
}

export function* watchAuthSuccess() {
    /*
      takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
      i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    */
    yield takeEvery(AUTHENTICATE_USER_SUCCESS, authToSystemSuccess);
}

export function* watchAuth() {
    /*
      takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
      i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    */
    yield takeEvery(AUTHENTICATE_USER, authToSystem);
}

export function* loginToSystem() {
    try {
        const userInput = yield select(getUserLoginInput());
        const email = userInput.emailUser;
        const password = userInput.passUser;
        const res = yield call(request, API_URL.authApp.login, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        yield put(loginSuccess(res));
    } catch (error) {
        yield put(loginFail(error));
    }
}
export function* watchLoginSuccess() {
    /*
      takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
      i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    */
    yield takeEvery(LOGIN_SUCCESS, authToSystem);
}

export function* watchLogin() {
    /*
      takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
      i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    */
    yield takeEvery(LOGIN, loginToSystem);
}
export default function* rootSaga() {
    yield all([
        fork(watchAuth),
        fork(watchLoginSuccess),
        fork(watchLogin),
        fork(watchAuthSuccess),
    ]);
}
