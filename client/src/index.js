import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import App from './components/App';
import reducers from "./reducers";
import 'materialize-css/dist/css/materialize.min.css';
import reduxThunk from 'redux-thunk';

/**
 * It is the redux thunk middleware that gives us direct access to the store.
 */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/**
 * Provider is the component that makes the store accessible to every component in the app.
 * Whenevery any state changes , Provider informs all the components and causes them to re-render.
 */
ReactDOM.render(

    <Provider store={store}> <App /></Provider>, document.querySelector("#root"));