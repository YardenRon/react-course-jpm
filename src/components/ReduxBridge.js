import React, { createContext, useContext, useState, useEffect } from 'react';

const ReduxContext = createContext();

export const useRedux = () => useContext(ReduxContext);

export function ReduxBridge({ store, children }) {
  const [reduxState, setReduxState] = useState(store.getState());
  useEffect(() => store.subscribe(() => setReduxState(store.getState())), [
    store,
  ]);
  const ctx = { state: reduxState, dispatch: store.dispatch };
  return <ReduxContext.Provider value={ctx}>{children}</ReduxContext.Provider>;
}

export function withRedux(Component, mapper) {
  return props => {
    const { state, dispatch } = useRedux();
    const mappedProps = mapper(state, dispatch, props)
    return <Component {...props} {...mappedProps} />;
  };
}
