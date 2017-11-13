import React from 'react';
import configureStore from 'redux-mock-store';
// import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import createTestComponent from './utils/createTestComponent';
import EditProfile from '../components/EditProfile';
import EditProfileForm from '../components/EditProfileForm';

const initialProfileState = {
  success: false
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Edit profile', () => {
  const store = mockStore(initialProfileState);
  describe('component:', () => {
    it('should render the right number of divs in the edit profile page (7)', () => {
      const wrapper = shallow(<EditProfile />);
      expect(wrapper.find('div').length).toEqual(7);
    });
  });

  describe('form', () => {
    it('should dispatch an error action creator when no input in form', () => {
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'username',

        },
        preventDefault
      };
      const wrapper = shallow(<EditProfileForm store={store} />);
      wrapper.dive().find('form').simulate('submit', event);
      expect(store.getActions()).toEqual([{
        type: 'SET_EDIT_PROFILE_ERROR',
        value: 'Please enter your current password'
      }]);
    });
  });
});
