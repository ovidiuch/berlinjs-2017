import React from 'react';
import { createContext } from '../../../__unreleased-react-cosmos-enzyme';
import proxies from '../../../../cosmos.proxies';
import guestFixture from '../__fixtures__/guest';
import loggedInFixture from '../__fixtures__/logged-in';
import RealLifeComponent from '../';

describe('guest', () => {
  const { mount, wrapper, reduxState, url, localStorage } = createContext({
    proxies,
    component: RealLifeComponent,
    fixture: guestFixture
  });

  beforeEach(mount);

  test('asks user who they are', () => {
    expect(wrapper().text()).toContain('Wer bist du?');
  });

  test('renders login button', () => {
    expect(wrapper('button').text()).toEqual('Login');
  });

  describe('upon clicking on the login button', () => {
    beforeEach(() => {
      wrapper()
        .find('button')
        .simulate('click');

      // Run pending micro tasks from async action
      return new Promise(resolve => {
        setImmediate(resolve);
      });
    });

    test('renders greeting for logged in user', () => {
      expect(wrapper().text()).toContain('Hallo Dan!');
    });

    test('renders logout button', () => {
      expect(wrapper('button').text()).toEqual('Logout');
    });

    test('populates name in Redux state', () => {
      expect(reduxState().name).toBe('Dan');
    });

    test('caches logged in user in local storage', () => {
      expect(localStorage().name).toBe('Dan');
    });

    test('redirects to home URL', () => {
      expect(url()).toBe('/');
    });
  });
});

describe('logged in', () => {
  const { mount, wrapper, reduxState, url, localStorage } = createContext({
    proxies,
    component: RealLifeComponent,
    fixture: loggedInFixture
  });

  beforeEach(mount);

  test('renders greeting for logged in user', () => {
    expect(wrapper().text()).toContain('Hallo Dan!');
  });

  test('populates name in Redux state', () => {
    expect(reduxState().name).toBe('Dan');
  });

  test('renders logout button', () => {
    expect(
      wrapper()
        .find('button')
        .text()
    ).toEqual('Logout');
  });

  describe('upon clicking on the logout button', () => {
    beforeEach(() => {
      wrapper()
        .find('button')
        .simulate('click');
    });

    test('asks user who they are', () => {
      expect(wrapper().text()).toContain('Wer bist du?');
    });

    test('renders login button', () => {
      expect(wrapper('button').text()).toEqual('Login');
    });

    test('removes name from Redux state', () => {
      expect(reduxState().name).toBe(null);
    });

    test('removes logged in user from local storage', () => {
      expect(localStorage().name).toBeFalsy();
    });

    test('redirects to home URL', () => {
      expect(url()).toBe('/login');
    });
  });
});
