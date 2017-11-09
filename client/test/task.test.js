import React from 'react';
import configureStore from 'redux-mock-store';
// import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import createTestComponent from './utils/createTestComponent';
import TaskForm from '../components/TaskForm';

const initialTaskState = {
  currentlySending: false,
  tasks: [],
  task: {},
  completed: false,
  taskDate: {}
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Task', () => {
  let taskForm;

  const store = mockStore(initialTaskState);
  beforeEach(() => {
    taskForm = createTestComponent(TaskForm, {
      store
    });
  });
  describe('form:', () => {
    it('should render the right number of divs in the task form (8)', () => {
      const error = {
        todoFormError: 'this is the error'
      };
      const wrapper = mount(<TaskForm store={store} />);
      expect(wrapper.find('div').length).toEqual(8);
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
      const wrapper = shallow(<TaskForm store={store} />);
      wrapper.dive().find('form').simulate('submit', event);
      expect(store.getActions()).toEqual([
        {
          type: 'SET_TASK_FORM_ERROR',
          value: 'Please enter your task'
        }
      ]);
    });
  });
});
