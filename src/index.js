import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { rootReducer } from './reducers';
import App from './App';
import './index.css';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);

const store = createStore(
    rootReducer,
    enhancer
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
