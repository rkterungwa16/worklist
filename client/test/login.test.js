import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { LoginForm } from '../components/LoginForm';


const initialLoginState = {
  error: '',
  sending: false,
  loggedIn: false,
  currentlySending: false
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Login', () => {
  const store = mockStore(initialLoginState);
  describe('form:', () => {
    it('should dispatch an error action creator when no input in form', () => {
      const preventDefault = jest.fn();
      const setLoginError = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'email',

        },
        preventDefault
      };
      const wrapper = mount(<LoginForm
        store={store}
        setLoginError={setLoginError}
      />);
      wrapper.find('form').simulate('submit', event);
      expect(setLoginError).toHaveBeenCalled();
    });

    it('should login a registered user', () => {
      const onSubmit = jest.fn();
      const setLoginError = jest.fn();
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'email',

        },
        preventDefault
      };

      const wrapper = mount(<LoginForm
        store={store}
        setLoginError={setLoginError}
        onSubmit={onSubmit}
      />);

      wrapper.setState({
        email: 'john@gmail.com',
        password: 'john'
      });
      wrapper.instance().handleSubmit(event);
      expect(onSubmit).toHaveBeenCalled();
    });

    it('should change state on change event', () => {
      const preventDefault = jest.fn();
      const setLoginError = jest.fn();
      const event = {
        target: {
          value: 'boss@gmail.com',
          name: 'email',

        },
        preventDefault
      };
      const wrapper = mount(<LoginForm
        store={store}
        collaboratorError={setLoginError}
      />);
      wrapper.instance().handleChange(event);
      expect(wrapper.state()).toEqual({
        email: 'boss@gmail.com',
        password: ''
      });
    });
  });
});
