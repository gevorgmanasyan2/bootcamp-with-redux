// import {createStore,applyMiddleware,compose} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import rootReducer from './reducer';
// import thunkMiddleware from 'redux-thunk';



// const composedEnhacer=composeWithDevTools(applyMiddleware(thunkMiddleware));
// const store= createStore(rootReducer,composedEnhacer);



// export default store;



import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;