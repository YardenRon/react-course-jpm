import { createStore, combineReducers, applyMiddleware } from 'redux';
import { diff } from 'deep-diff';

/**
 * interface Action {
 *  type: string;
 *  payload?: jsonable;
 *  meta?: jsonable;
 *  error?: jsonable;
 * }
 */

const logMiddleware = store => next => action => {
  const oldState = store.getState();
  next(action);
  const newState = store.getState();
  console.log({ action, stateDiff: diff(oldState, newState) });
};

function count(state = 0, action) {
  switch (action.type) {
    case 'INCEREMENT':
      return state + 1;
    case 'DECEREMENT':
      return state - 1;
    default:
      return state;
  }
}

function clicks(state = 0, action) {
  switch (action.type) {
    case 'INCEREMENT':
    case 'DECEREMENT':
      return state + 1;
    default:
      return state;
  }
}

export const store = createStore(
  combineReducers({
    count,
    clicks,
  }),
  applyMiddleware(logMiddleware)
);