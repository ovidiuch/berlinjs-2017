import React from 'react';
import { createContext } from '../../../__unreleased-react-cosmos-enzyme';
import proxies from '../../../../cosmos.proxies';
import RealLifeComponent from '../';

describe('guest', () => {
  const { mount, getWrapper, getUrl, getLocalStorage } = createContext({
    proxies,
    component: RealLifeComponent,
    fixture: {
      props: {},
      url: '/login',
      localStorage: {},
      reduxState: {
        name: null
      },
      fetch: [
        {
          matcher: '/api/login',
          response: {
            name: 'Dan'
          }
        }
      ]
    }
  });

  beforeEach(mount);

  test('asks user who they are', () => {
    expect(getWrapper().text()).toContain('Wer bist du?');
  });

  test('renders login button', () => {
    expect(
      getWrapper()
        .find('button')
        .text()
    ).toEqual('Login');
  });

  describe('upon clicking on the login button', () => {
    beforeEach(() => {
      getWrapper()
        .find('button')
        .simulate('click');

      // Run pending micro tasks from async action
      return new Promise(resolve => {
        setImmediate(resolve);
      });
    });

    test('renders greeting for logged in user', () => {
      expect(getWrapper().text()).toContain('Hallo Dan!');
    });

    test('renders logout button', () => {
      expect(
        getWrapper()
          .find('button')
          .text()
      ).toEqual('Logout');
    });

    test('caches logged in user in local storage', () => {
      expect(getLocalStorage().name).toBe('Dan');
    });

    test('redirects to home URL', () => {
      expect(getUrl()).toBe('/');
    });
  });
});

describe('logged in', () => {
  const { mount, getWrapper, getUrl, getLocalStorage } = createContext({
    proxies,
    component: RealLifeComponent,
    fixture: {
      props: {},
      url: '/',
      localStorage: {
        name: 'Dan'
      },
      reduxState: {
        name: null
      }
    }
  });

  beforeEach(mount);

  test('renders greeting for logged in user', () => {
    expect(getWrapper().text()).toContain('Hallo Dan!');
  });

  test('renders logout button', () => {
    expect(
      getWrapper()
        .find('button')
        .text()
    ).toEqual('Logout');
  });

  describe('upon clicking on the logout button', () => {
    beforeEach(() => {
      getWrapper()
        .find('button')
        .simulate('click');
    });

    test('asks user who they are', () => {
      expect(getWrapper().text()).toContain('Wer bist du?');
    });

    test('renders login button', () => {
      expect(
        getWrapper()
          .find('button')
          .text()
      ).toEqual('Login');
    });

    test('removes logged in user from local storage', () => {
      expect(getLocalStorage().name).toBeFalsy();
    });

    test('redirects to home URL', () => {
      expect(getUrl()).toBe('/login');
    });
  });
});
