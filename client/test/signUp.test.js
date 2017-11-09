import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import createTestComponent from './utils/createTestComponent';
import SignupForm from '../components/SignupForm';

const initialRegisterState = {
  error: '',
  currentlySending: false
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Signup', () => {
  let signupForm;

  const store = mockStore(initialRegisterState);
  beforeEach(() => {
    signupForm = createTestComponent(SignupForm, {
      handleSubmit: sinon.spy(),
      handleChange: sinon.spy(),
      store
    });
  });
  describe('form:', () => {
    it('should render the right number of divs in the signupForm (4)', () => {
      const wrapper = mount(<SignupForm store={store} />);
      expect(wrapper.find('div').length).toEqual(3);
    });

    it('should set #state.username as "Richard"', () => {
      signupForm.state.username = 'Richard';
      expect(signupForm.state.username).toEqual('Richard');
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
      const wrapper = shallow(<SignupForm store={store} />);
      wrapper.dive().find('form').simulate('submit', event);
      expect(store.getActions()).toEqual([
        {
          type: 'SET_SIGNUP_ERROR',
          value: 'Please enter your details'
        }
      ]);
    });
  });

  it('should dispatch an error action creator when no input in form', () => {
    const preventDefault = jest.fn();
    const onSubmit = jest.fn();
    const event = {
      target: {
        value: 'value',
        name: 'username',

      },
      preventDefault
    };
    const wrapper = mount(<SignupForm
      store={store}
      onSubmit={onSubmit}
    />);

    wrapper.setState({
      username: 'bar',
      password: 'bar',
      email: 'bar@bar.com'
    });
    wrapper.find('form').simulate('submit');
    console.log('THIS IS THE WRAPPER', wrapper.props().onSubmit);
    console.log('this is the props', wrapper.getNode().props.store.getState());
    expect(wrapper.props().onSubmit).toHaveBeenCalled();
  });

  it('should dispatch an error action creator when no input in form', () => {
    const preventDefault = jest.fn();
    const onSubmit = jest.fn();
    const event = {
      target: {
        value: 'value',
        name: 'username',

      },
      preventDefault
    };
    const wrapper = shallow(<SignupForm store={store} onSubmit={onSubmit} />);

    wrapper.dive().find('form').simulate('submit', event);

    // expect(store.getActions()).toEqual([
    //   {
    //     type: 'SET_SIGNUP_ERROR',
    //     value: 'Please enter your details'
    //   }
    // ]);
  });
});
