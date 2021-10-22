import { createStore, compose, applyMiddleware } from "redux";
import visor from "./utils/visor";

import rootReducer from "./reducers";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(visor));
const store = createStore(rootReducer, middleware);
/* eslint-enable */

export default store;
