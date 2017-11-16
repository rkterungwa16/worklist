import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import ResetPassword from '../components/ResetPassword';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

jest.mock('react-router-dom');
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialresetPasswordState = {
  success: {}
};

describe('Reset Password', () => {

  const store = mockStore(initialresetPasswordState);
  describe('component:', () => {
    it('should render the right number of divs in the task form (7)', () => {
      const wrapper = shallow(<ResetPassword store={store} />);
      expect(wrapper.find('div').length).toEqual(7);
    });
  });

  describe('form:', () => {
    describe('form:', () => {
      it('should render an error message', () => {
        const error = {
          resetPasswordFormError: 'This is an error'
        };
        const wrapper = shallow(<ResetPasswordForm
          store={store}
          error={error}
        />);
        expect(wrapper.find('.red-text').text()).toEqual('This is an error');
      });

      it('should render a success message', () => {
        const resetPassword = {
          success: {
            status: 'This is a success'
          }
        };
        const wrapper = shallow(<ResetPasswordForm
          store={store}
          resetPassword={resetPassword}
        />);
        expect(wrapper.find('.green-text').text()).toEqual('This is a success');
      });

      it('should dispatch an error action creator when no input in form', () => {
        const preventDefault = jest.fn();
        const passwordResetError = jest.fn();
        const event = {
          target: {
            value: 'value',
            name: 'email',

          },
          preventDefault
        };
        const wrapper = mount(<ResetPasswordForm
          store={store}
          passwordResetError={passwordResetError}
        />);
        wrapper.find('form').simulate('submit', event);
        expect(passwordResetError).toHaveBeenCalled();
      });

      it('should reset user password', () => {
        const changePassword = jest.fn();
        const passwordResetError = jest.fn();
        const preventDefault = jest.fn();
        const event = {
          target: {
            value: 'value',
            name: 'password',

          },
          preventDefault
        };

        const wrapper = mount(<ResetPasswordForm
          store={store}
          passwordResetError={passwordResetError}
          changePassword={changePassword}
        />);

        wrapper.setState({
          email: 'john@gmail.com',
          password: 'password',
          confirmPassword: 'password'
        });
        wrapper.instance().handleSubmit(event);
        expect(changePassword).toHaveBeenCalled();
      });

      it('should change state on change event', () => {
        const preventDefault = jest.fn();
        const changePassword = jest.fn();
        const passwordResetError = jest.fn();
        const event = {
          target: {
            value: 'boss@gmail.com',
            name: 'email',

          },
          preventDefault
        };
        const wrapper = mount(<ResetPasswordForm
          store={store}
          changePassword={changePassword}
          passwordResetError={passwordResetError}
        />);
        wrapper.instance().handleChange(event);
        expect(wrapper.state()).toEqual({
          email: 'boss@gmail.com',
          confirmPassword: '',
          password: ''
        });
      });
    });
  });
});
