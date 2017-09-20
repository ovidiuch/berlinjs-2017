/**
 *  Test Helpers
 */

import React from 'react';
import { mount as mountEnzyme } from 'enzyme';
import { Loader } from 'react-cosmos-loader';

export const createContext = ({ proxies, component, fixture }) => {
  let loaderId = 0;
  let rootWrapper;
  let wrapper;
  let state;

  const onFixtureUpdate = fixtureUpdate => {
    if (rootWrapper) {
      // Some proxies will not preserve React instances (eg. by setting
      // different `key` attrs between renders, so we need to keep the inner
      // wrapper up to date after every state change.
      wrapper = rootWrapper.find(component);
    }

    state = {
      ...state,
      ...fixtureUpdate
    };
  };

  const mount = () => {
    state = { ...fixture };

    const rootWrapper = mountEnzyme(
      <Loader
        key={++loaderId}
        proxies={proxies}
        component={component}
        fixture={fixture}
        onFixtureUpdate={onFixtureUpdate}
      />
    );

    wrapper = rootWrapper.find(component);
  };

  return {
    mount,
    unmount: () => rootWrapper.unmount(),
    wrapper: selector => (selector ? wrapper.find(selector) : wrapper),
    reduxState: () => state.reduxState,
    url: () => state.url,
    localStorage: () => state.localStorage
  };
};
