export const SELECTOR_ID_PAGE = 'global';

export const DEFAULT_LOCALE = 'en';
export const LOCAL_STORAGE_ID_KEY = {
    token: 'app-token',
};
export const ROUTE_TREE = {
    home: 'home',
    login: 'login',
    userApp: 'user',
    roomApp: 'room-management',
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
        bookRoom: `${APP_ROOT_API}events`,
        getEvents: `${APP_ROOT_API}events?idRoom={idRoom}`,
        getBookedEvents: `${APP_ROOT_API}events/eventsBooked?idRoom={idRoom}&selectedDate={selectedDate}`,
    },
    userApp: {
        getUsers: `${APP_ROOT_API}users`,
    }
};
