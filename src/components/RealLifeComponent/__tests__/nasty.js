import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createHistory from 'history/createMemoryHistory';
import fetchMock from 'fetch-mock';
import reducer from '../../../reducer';
import RealLifeComponent from '../';

class LocalStorageMock {
  constructor(store) {
    this.store = store;
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

describe('guest', () => {
  let wrapper;
  let routerHistory;

  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(global, 'localStorage', {
      writable: true,
      value: new LocalStorageMock({})
    });

    // Mock fetch
    fetchMock.mock({
      matcher: '/api/login',
      response: {
        name: 'Dan'
      }
    });

    // Mock Redux
    const store = createStore(reducer, { name: null });

    // Mock React Router
    routerHistory = createHistory({ initialEntries: ['/login'] });

    wrapper = mount(
      <Router history={routerHistory}>
        <Provider store={store}>
          <RealLifeComponent />
        </Provider>
      </Router>
    );
  });

  test('asks user who they are', () => {
    expect(wrapper.text()).toContain('Wer bist du?');
  });

  test('renders login button', () => {
    expect(wrapper.find('button').text()).toEqual('Login');
  });

  describe('upon clicking on the login button', () => {
    beforeEach(() => {
      wrapper.find('button').simulate('click');

      // Run pending micro tasks from async action
      return new Promise(resolve => {
        setImmediate(resolve);
      });
    });

    test('renders greeting for logged in user', () => {
      expect(wrapper.text()).toContain('Hallo Dan!');
    });

    test('renders logout button', () => {
      expect(wrapper.find('button').text()).toEqual('Logout');
    });

    test('caches logged in user in local storage', () => {
      expect(localStorage.getItem('name')).toBe('Dan');
    });

    test('redirects to home URL', () => {
      expect(routerHistory.location.pathname).toBe('/');
    });
  });
});

describe('logged in', () => {
  let wrapper;
  let routerHistory;

  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(global, 'localStorage', {
      writable: true,
      value: new LocalStorageMock({ name: 'Dan' })
    });

    // Mock Redux
    const store = createStore(reducer, { name: null });

    // Mock React Router
    routerHistory = createHistory({ initialEntries: ['/'] });

    wrapper = mount(
      <Router history={routerHistory}>
        <Provider store={store}>
          <RealLifeComponent />
        </Provider>
      </Router>
    );
  });

  test('renders greeting for logged in user', () => {
    expect(wrapper.text()).toContain('Hallo Dan!');
  });

  test('renders logout button', () => {
    expect(wrapper.find('button').text()).toEqual('Logout');
  });

  describe('upon clicking on the logout button', () => {
    beforeEach(() => {
      wrapper.find('button').simulate('click');
    });

    test('asks user who they are', () => {
      expect(wrapper.text()).toContain('Wer bist du?');
    });

    test('renders login button', () => {
      expect(wrapper.find('button').text()).toEqual('Login');
    });

    test('removes logged in user from local storage', () => {
      expect(localStorage.getItem('name')).toBeFalsy();
    });

    test('redirects to home URL', () => {
      expect(routerHistory.location.pathname).toBe('/login');
    });
  });
});
