import React from 'react';
import ReactDom from 'react-dom';
import App from './main/app';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

const reducers = combineReducers({
    field: () => ({ value: 'Opa' })
})

ReactDom.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>, document.getElementById('app'));