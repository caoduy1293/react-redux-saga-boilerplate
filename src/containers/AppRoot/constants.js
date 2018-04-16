export const SELECTOR_ID_PAGE = 'global';

export const DEFAULT_LOCALE = 'en';
export const LOCAL_STORAGE_ID_KEY = {
    token: 'app-token',
};
export const ROUTE_TREE = {
    login: 'login',
};
const APP_ROOT_API = 'v1/';
export const API_URL = {
    authApp: {
        login: `${APP_ROOT_API}auth/login`,
        me: `${APP_ROOT_API}auth/me`,
        register: `${APP_ROOT_API}auth/register`,
    },
    dashboardApp: {
        getRooms: `${APP_ROOT_API}rooms`,
        getEvents: `${APP_ROOT_API}events?idRoom={idRoom}`,
    },
};
