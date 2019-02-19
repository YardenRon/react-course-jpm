import { createStore } from 'redux';

function validator(predicate, wrappedReducer) {
  return function wrapperReducer(state, action) {
    const newState = wrappedReducer(state, action);
    return predicate(newState) ? newState : state;
  };
}

const countReducer = validator(
  state => state >= 0 && state <= 5,
  (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        const { payload = 1 } = action;
        return state + payload;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }
);

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { username, password } = action.payload;
      return { username, password };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(function mainReducer(state = {}, action) {
  return {
    count: countReducer(state.count, action),
    user: userReducer(state.user, action),
  };
});

const dispatch = store.dispatch;
const counter = document.getElementById('counter');
for (let el of document.querySelectorAll('[data-action]')) {
  el.onclick = () =>
    dispatch({
      type: el.dataset.action,
      payload: el.dataset.payload ? eval(el.dataset.payload) : undefined,
    });
}
store.subscribe(() => {
  console.log(store.getState());
  counter.textContent = store.getState().count;
  // document.querySelector(
  //   '[data-action=DECREMENT]'
  // ).disabled = !store.getState();
});
dispatch({ type: '@@INTERNAL__BOOTSTRAP__INIT' });
