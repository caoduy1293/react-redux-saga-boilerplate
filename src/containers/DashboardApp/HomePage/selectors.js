import { createSelector } from 'reselect/es';

import { SELECTOR_ID_PAGE } from './constants';
import { HomePageStateName } from './reducer';

const selectPageState = (state) => state.get(SELECTOR_ID_PAGE);

const getLoadingState = () => createSelector(
    selectPageState,
    (pageState) => pageState.get(HomePageStateName.loading)
);
const getErrorState = () => createSelector(
    selectPageState,
    (pageState) => pageState.get(HomePageStateName.error)
);
const getMessageState = () => createSelector(
    selectPageState,
    (pageState) => pageState.get(HomePageStateName.message)
);
const getRoomSelectedState = () => createSelector(
    selectPageState,
    (pageState) => pageState.get(HomePageStateName.selectedRoom)
);

const getRoomsState = () => createSelector(
    selectPageState,
    (pageState) => pageState.get(HomePageStateName.rooms)
);

const getEventsState = () => createSelector(
    selectPageState,
    (pageState) => pageState.get(HomePageStateName.events)
);

export {
    selectPageState,
    getLoadingState,
    getMessageState,
    getErrorState,
    getRoomsState,
    getEventsState,
    getRoomSelectedState,
};
