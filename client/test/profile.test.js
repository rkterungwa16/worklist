import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import EditProfile from '../components/EditProfile';
import { EditProfileForm } from '../components/EditProfileForm';
import ChangeProfilePicture from '../components/ChangeProfilePicture';

const initialProfileState = {
  success: false
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('react-router-dom');


describe('Edit profile', () => {
  const store = mockStore(initialProfileState);
  describe('component:', () => {
    it('should render the right number of divs (7)', () => {
      const wrapper = shallow(<EditProfile />);
      expect(wrapper.find('div').length).toEqual(7);
    });
  });

  describe('form:', () => {
    it('should dispatch an error action creator when no input in form', () => {
      const preventDefault = jest.fn();
      const editProfileError = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'email',

        },
        preventDefault
      };
      const wrapper = mount(<EditProfileForm
        store={store}
        editProfileError={editProfileError}
      />);
      wrapper.find('form').simulate('submit', event);
      expect(editProfileError).toHaveBeenCalled();
    });

    it('should change the username to john', () => {
      const editProfile = jest.fn();
      const editProfileError = jest.fn();
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'password',

        },
        preventDefault
      };

      const wrapper = mount(<EditProfileForm
        store={store}
        editProfileError={editProfileError}
        editProfile={editProfile}
      />);

      wrapper.setState({
        username: 'john',
        currentPassword: 'password'
      });
      wrapper.instance().handleSubmit(event);
      expect(editProfile).toHaveBeenCalled();
    });

    it('should change state on change event', () => {
      const preventDefault = jest.fn();
      const editProfile = jest.fn();
      const editProfileError = jest.fn();
      const event = {
        target: {
          value: 'boss',
          name: 'currentPassword',

        },
        preventDefault
      };
      const wrapper = mount(<EditProfileForm
        store={store}
        editProfile={editProfile}
        editProfileError={editProfileError}
      />);
      wrapper.instance().handleChange(event);
      expect(wrapper.state()).toEqual({
        currentPassword: 'boss',
        confirmPassword: '',
        password: '',
        username: ''
      });
    });
  });
});

describe('Profile Picture', () => {
  const store = mockStore(initialProfileState);
  describe('component:', () => {
    it('should render the right number of divs (9)', () => {
      const wrapper = mount(<ChangeProfilePicture store={store} />);
      expect(wrapper.find('div').length).toEqual(9);
    });
  });
});
