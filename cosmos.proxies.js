import createFetchProxy from 'react-cosmos-fetch-proxy';
import createLocalStorageProxy from 'react-cosmos-localstorage-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import { createStore } from 'redux';

const reducer = (state = {}, action) => {
  if (action.type === 'SET_NAME') {
    return {
      ...state,
      name: action.name
    };
  }

  return state;
};

export default [
  createFetchProxy(),
  createLocalStorageProxy(),
  createReduxProxy({
    createStore: state => createStore(reducer, state)
  })
];
