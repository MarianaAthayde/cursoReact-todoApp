import React from 'react';
import ReactDom from 'react-dom';
import App from './main/app';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers/reducers';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(thunk, multi, promise)(createStore)(rootReducers, devTools);

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app'));