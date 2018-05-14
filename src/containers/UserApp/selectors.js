import { createSelector } from 'reselect/es';
import { get } from 'lodash';

import { SELECTOR_ID_PAGE } from './constants';
import { APP_STATE_NAME } from './reducer';

const selectPageState = (state) => state[SELECTOR_ID_PAGE];

const getLoadingAppState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.loading)
);
const getUsersState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.users)
);

const getUserFormState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.userForm)
);

const getUserFormLoadingState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.userFormLoading)
);

const getUserFormDataState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.userFormUserEdited)
);


export {
    selectPageState,
    getLoadingAppState,
    getUsersState,
    getUserFormState,
    getUserFormLoadingState,
    getUserFormDataState,
};
