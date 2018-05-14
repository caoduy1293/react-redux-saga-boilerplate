import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {array} list key & reducer
 *
 */
export default (arrayReducer) => (WrappedComponent) => {
    class ReducerInjector extends React.Component {
        static WrappedComponent = WrappedComponent;
        static contextTypes = {
            store: PropTypes.object.isRequired,
        };
        static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

        componentWillMount() {
            const { injectReducer } = this.injectors;
            for(let i = 0,item; i < arrayReducer.length; i++){
                item = arrayReducer[i];
                injectReducer(item.key, item.reducer);
            }
        }

        injectors = getInjectors(this.context.store);

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
