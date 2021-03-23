import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import mySearchReducer from '../search/state/ducks';
import searchSaga from '../search/state/saga';
import myUserReducer from '../user/state/ducks';
import userSaga from '../user/state/saga';

const reducer = combineReducers({
  search: mySearchReducer,
  user: myUserReducer
});
const sagaMiddleware = createSagaMiddleware();
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
// const store = createStore(
//   reducer,
//   applyMiddleware(sagaMiddleware),
// );

function* rootSaga() {
  yield all([searchSaga(), userSaga()]);
}
sagaMiddleware.run(rootSaga);

export default store;
