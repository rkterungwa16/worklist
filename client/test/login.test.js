import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import createTestComponent from './utils/createTestComponent';
import LoginForm from '../components/LoginForm';


const initialLoginState = {
  error: '',
  sending: false,
  loggedIn: false,
  currentlySending: false
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Login', () => {
  let loginForm;

  const store = mockStore(initialLoginState);
  beforeEach(() => {
    loginForm = createTestComponent(LoginForm, {
      handleSubmit: sinon.spy(),
      handleChange: sinon.spy(),
      store
    });
  });
  describe('form:', () => {
    it('should render the right number of divs in the login form (3)', () => {
      const wrapper = mount(<LoginForm store={store} />);
      console.log('THE VALUE OF THE WRAPPER IN LOGIN', wrapper.props());
      expect(wrapper.find('div').length).toEqual(3);
    });

    it('should set #state.username as "Richard"', () => {
      loginForm.state.username = 'Richard';
      expect(loginForm.state.username).toEqual('Richard');
    });

    it('should dispatch an error action creator when no input in form', () => {
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'username',

        },
        preventDefault
      };
      const wrapper = shallow(<LoginForm store={store} />);
      wrapper.dive().find('form').simulate('submit', event);
      expect(store.getActions()).toEqual([
        {
          type: 'SET_LOGIN_ERROR',
          value: 'Please enter your details'
        }
      ]);
    });
  });
});
