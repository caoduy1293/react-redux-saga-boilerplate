// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import configureStore from "./configureStore";
import LanguageProvider from "./containers/SharedComponent/LanguageProvider";
import {translationMessages} from "./i18n";
import rootSaga from './containers/AppRoot/saga';
import registerServiceWorker from './registerServiceWorker';

// Import CSS reset and Global Styles
import './global-styles';

import App from "./containers/AppRoot";


// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

store.runSaga(rootSaga);

const MOUNT_NODE = document.getElementById('root');

const renderApp = (message) => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={message}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE
    )
};


// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(import('intl'));
    }))
        .then(() => Promise.all([
            import('intl/locale-data/jsonp/en.js'),
            import('intl/locale-data/jsonp/de.js'),
        ]))
        .then(() => renderApp(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    renderApp(translationMessages);
}

if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

registerServiceWorker();
