import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import createTestComponent from './utils/createTestComponent';
import { TaskForm } from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { TaskItem } from '../components/TaskItem';

jest.mock('react-datepicker');
jest.mock('rc-tooltip');
jest.mock('browserMocks');
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
  const store = mockStore(initialTaskState);
  beforeEach(() => {
    taskForm = createTestComponent(TaskForm, {
      store
    });
  });
  describe('form:', () => {
    const createTask = jest.fn();
    const setTaskFormError = jest.fn();
    const props = {
      createTask,
      setTaskFormError
    };

    it('should dispatch an error message for an empty form', () => {
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'value',
          name: 'username',

        },
        preventDefault
      };
      const wrapper = mount(<TaskForm
        store={store}
        {...props}
      />);

      wrapper.instance().handleSubmit(event);
      expect(setTaskFormError).toHaveBeenCalled();
    });

    it('should set state', () => {
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'New task',
          name: 'task',

        },
        preventDefault
      };
      const wrapper = mount(<TaskForm
        store={store}
        {...props}
      />);

      wrapper.instance().handleChange(event);
      expect(wrapper.state().task).toEqual('New task');
    });
  });

  describe('list:', () => {
    it('should render the right number of divs in the task list (2)', () => {
      const tasks = [{
        _id: '1234'
      }];

      const todo = {
        _id: '4321'
      };
      const wrapper = mount(<TaskList
        store={store}
        tasks={tasks}
        todo={todo}
      />);
      expect(wrapper.find('div').length).toEqual(2);
    });
  });

  describe('item:', () => {
    const completeTask = jest.fn();
    const setTaskDueDate = jest.fn();
    const deleteTask = jest.fn();
    const editingTask = jest.fn();
    const editTask = jest.fn();

    const props = {
      completeTask,
      setTaskDueDate,
      deleteTask,
      editingTask,
      editTask,
      tasks: [{
        task: {},
        completed: false,
        priority: '',
        dueDate: '',
        _id: '12345qe'
      }],
      deleted: false,
      editing: false
    };
    it('should render the right number of divs in the task list (6)', () => {
      const tasks = [{
        _id: '1234',
        task: 'my-task',
        completed: true
      }];
      const myDelete = false;
      const editing = false;

      const wrapper = mount(<TaskItem
        store={store}
        tasks={tasks}
        delete={myDelete}
        editing={editing}
      />);
      expect(wrapper.find('div').length).toEqual(6);
    });

    it('should set the state of task item to true', () => {
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().handleChange(false);
      expect(wrapper.state().completed).toEqual(true);
    });

    it('should set the state of task item to false', () => {
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().handleChange(true);
      expect(wrapper.state().completed).toEqual(false);
    });

    it('should set the state of due date', () => {
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().handleDateChange('1970-01-01T00:00:00.003Z');
      expect(wrapper.state().dueDate).toEqual('1970-01-01T00:00:00.003Z');
    });

    it('should delete a task', () => {
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().deleteOnClick();
      expect(wrapper.state().deleted).toEqual(true);
    });

    it('should edit a task', () => {
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().editOnClick();
      expect(wrapper.state().editing).toEqual(true);
    });

    it('should exit an edit form', () => {
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().clearEditOnClick();
      expect(wrapper.state().editing).toEqual(false);
    });

    it('should exit an edit form', () => {
      const preventDefault = jest.fn();
      const event = {
        preventDefault
      };
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().toggleCalendar(event);
      expect(wrapper.state().isOpen).toEqual(true);
    });

    it('should handle task edit form input change', () => {
      const preventDefault = jest.fn();
      const event = {
        target: {
          value: 'new task',
          name: 'editedTask'
        },
        preventDefault
      };
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.instance().handleEditTaskChange(event);
      expect(wrapper.state().editedTask).toEqual('new task');
    });

    it('should edit a task', () => {
      const preventDefault = jest.fn();
      const event = {
        preventDefault
      };
      const wrapper = mount(<TaskItem
        store={store}
        {...props}
      />);
      wrapper.setState({
        editedTask: 'new task'
      });
      wrapper.instance().handleSubmit(event);
      expect(editTask).toHaveBeenCalled();
    });
  });
}); // handleEditTaskChange
