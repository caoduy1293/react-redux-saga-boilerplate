import * as jwt_decode from 'jwt-decode';
import {LOCAL_STORAGE_ID_KEY} from "../AppRoot/constants";

function getToken() {
    return localStorage.getItem(LOCAL_STORAGE_ID_KEY.token);
}

export function getTokenExpirationDate(token) {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
}
export function isTokenExpired(token = '') {
    if(!token) token = getToken();
    if(!token) return true;

    const date = getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
}