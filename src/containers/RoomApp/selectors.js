import { createSelector } from 'reselect/es';
import { get } from 'lodash';

import { SELECTOR_ID_PAGE } from './constants';
import { APP_STATE_NAME } from './reducer';

const selectPageState = (state) => state[SELECTOR_ID_PAGE];

const getLoadingAppState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.loading)
);
const getListRoomsState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.rooms)
);

const getRoomFormState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.roomForm)
);

const getRoomFormLoadingState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.roomFormLoading)
);

const getRoomFormDataState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.roomFormData)
);


export {
    selectPageState,
    getLoadingAppState,
    getListRoomsState,
    getRoomFormState,
    getRoomFormLoadingState,
    getRoomFormDataState,
};
