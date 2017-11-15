import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { CollaboratorForm } from '../components/CollaboratorForm';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialCollaboratorState = {
  success: {}
};


describe('Task', () => {
  const store = mockStore(initialCollaboratorState);
  describe('form:', () => {
    it('should dispatch an error action creator when no input in form', () => {
      const preventDefault = jest.fn();
      const collaboratorError = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'email',

        },
        preventDefault
      };
      const wrapper = mount(<CollaboratorForm
        store={store}
        collaboratorError={collaboratorError}
      />);
      wrapper.find('form').simulate('submit', event);
      expect(collaboratorError).toHaveBeenCalled();
    });

    it('should add given email as collaborator', () => {
      const addCollaborator = jest.fn();
      const collaboratorError = jest.fn();
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'email',

        },
        preventDefault
      };

      const wrapper = mount(<CollaboratorForm
        store={store}
        collaboratorError={collaboratorError}
        addCollaborator={addCollaborator}
      />);

      wrapper.setState({
        email: 'john@gmail.com'
      });
      wrapper.instance().handleSubmit(event);
      expect(addCollaborator).toHaveBeenCalled();
    });

    it('should change state on change event', () => {
      const preventDefault = jest.fn();
      const collaboratorError = jest.fn();
      const event = {
        target: {
          value: 'boss@gmail.com',
          name: 'email',

        },
        preventDefault
      };
      const wrapper = mount(<CollaboratorForm
        store={store}
        collaboratorError={collaboratorError}
      />);
      wrapper.instance().handleChange(event);
      expect(wrapper.state()).toEqual({
        email: 'boss@gmail.com'
      });
    });
  });
});
