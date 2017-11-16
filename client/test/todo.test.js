import React from 'react';
import configureStore from 'redux-mock-store';
// import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import createTestComponent from './utils/createTestComponent';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import TodoList from '../components/TodoList';

const initialTodoState = {
  currentlySending: false,
  todolists: [],
  todo: {},
  todoItem: {}
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Todo', () => {
  let todoForm;

  const store = mockStore(initialTodoState);
  beforeEach(() => {
    todoForm = createTestComponent(TodoForm, {
      store
    });
  });
  describe('form:', () => {
    it('should render the right number of divs in the todo form (3)', () => {
      const wrapper = mount(<TodoForm store={store} />);
      expect(wrapper.find('div').length).toEqual(3);
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
      const wrapper = shallow(<TodoForm store={store} />);
      wrapper.dive().find('form').simulate('submit', event);
      expect(store.getActions()).toEqual([
        {
          type: 'SET_TODO_FORM_ERROR',
          value: 'Please enter your todo'
        }
      ]);
    });
  });

  describe('Item', () => {
    it('should render the right number of divs in the todo item (1)', () => {
      const wrapper = mount(<TodoItem store={store} />);
      expect(wrapper.find('div').length).toEqual(1);
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
      const wrapper = shallow(<TodoItem store={store} />);
      wrapper.dive().find('a').simulate('click', event);
      console.log(store.getActions());
      expect(store.getActions()).toEqual([
        {
          type: 'SET_TODO_FORM_ERROR',
          value: 'Please enter your todo'
        }
      ]);
    });
  });

  describe('List', () => {
    it('should render the right number of divs in the todo item (1)', () => {
      const addedTodo = {
        createdTodo: {}
      }
      const wrapper = mount(<TodoList store={store} addedTodo={addedTodo} />);
      expect(wrapper.find('div').length).toEqual(1);
    });
  });
});
