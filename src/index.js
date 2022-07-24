import React from 'react';
import ReactDOM from 'react-dom/client';

import {createStore} from "redux";
import {Provider} from "react-redux";

import {loadState, saveState} from "./redux/store/localstore";
import reducers from "./redux/reducers";

import App from './App';
import "./App.sass";

const persistedState = loadState();

let store = createStore(
    reducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => saveState({
    env: store.getState().env
}))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);