import createFetchProxy from 'react-cosmos-fetch-proxy';
import createLocalStorageProxy from 'react-cosmos-localstorage-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
import { createStore } from 'redux';
import reducer from './src/reducer';

export default [
  createFetchProxy(),
  createLocalStorageProxy(),
  createReduxProxy({
    createStore: state => createStore(reducer, state)
  }),
  createRouterProxy()
];
