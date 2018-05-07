import { createSelector } from 'reselect/es';

import { SELECTOR_ID_PAGE } from './constants';
import { GlobalStateName } from './reducer';

const selectGlobal = (state) => state[SELECTOR_ID_PAGE];

const selectRoute = (state) => state['route'];

const getAuthenticateLoading = () => createSelector(
    selectGlobal,
    (globalState) => globalState[GlobalStateName.loading]
);
const getAuthenticateError = () => createSelector(
    selectGlobal,
    (globalState) => globalState[GlobalStateName.error]
);
const getAuthenticateMessage = () => createSelector(
    selectGlobal,
    (globalState) => globalState[GlobalStateName.message]
);
const getAuthenticatedUser = () => createSelector(
    selectGlobal,
    (globalState) => globalState[GlobalStateName.authenticatedUser]
);

const getUserLoginInput = () => createSelector(
    selectGlobal,
    (globalState) => globalState[GlobalStateName.userObjInput]
);
const getUserToken = () => createSelector(
    selectGlobal,
    (globalState) => globalState[GlobalStateName.accessToken]
);

const makeSelectLocation = () => createSelector(
    selectRoute,
    (routeState) => routeState['location'].toJS()
);

export {
    selectGlobal,
    getAuthenticateLoading,
    getAuthenticateError,
    getAuthenticateMessage,
    getAuthenticatedUser,
    getUserToken,
    getUserLoginInput,
    makeSelectLocation,
};
