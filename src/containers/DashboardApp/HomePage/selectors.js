import { createSelector } from 'reselect/es';
import { get } from 'lodash';

import { SELECTOR_ID_PAGE } from './constants';
import { HomePageStateName } from './reducer';

const selectPageState = (state) => state[SELECTOR_ID_PAGE];

const getLoadingState = () => createSelector(
    selectPageState,
    (pageState) => pageState[HomePageStateName.loading]
);
const getRoomSelectedState = () => createSelector(
    selectPageState,
    (pageState) => pageState[HomePageStateName.selectedRoom]
);

const getRoomsState = () => createSelector(
    selectPageState,
    (pageState) => pageState[HomePageStateName.rooms]
);

const getEventsState = () => createSelector(
    selectPageState,
    (pageState) => pageState[HomePageStateName.events]
);

const getEventsBookingFormLoading = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, HomePageStateName.eventBookingFormLoading)
);

const getEventsBookingFormCreated = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, HomePageStateName.eventBookingFormDataCreate)
);

export {
    selectPageState,
    getLoadingState,
    getRoomsState,
    getEventsState,
    getRoomSelectedState,
    getEventsBookingFormLoading,
    getEventsBookingFormCreated,
};
