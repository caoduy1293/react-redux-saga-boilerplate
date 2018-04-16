import { createSelector } from 'reselect/es';

import { SELECTOR_ID_PAGE } from './constants';
import { GlobalStateName } from './reducer';

const selectGlobal = (state) => state.get(SELECTOR_ID_PAGE);

const selectRoute = (state) => state.get('route');

const getAuthenticateLoading = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get(GlobalStateName.loading)
);
const getAuthenticateError = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get(GlobalStateName.error)
);
const getAuthenticateMessage = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get(GlobalStateName.message)
);
const getAuthenticatedUser = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get(GlobalStateName.authenticatedUser)
);

const getUserLoginInput = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get(GlobalStateName.userObjInput)
);
const getUserToken = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get(GlobalStateName.accessToken)
);

const makeSelectLocation = () => createSelector(
    selectRoute,
    (routeState) => routeState.get('location').toJS()
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
