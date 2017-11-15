import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import moxios from 'moxios';
import axios from 'axios';
import axiosConfig from '../helper/axiosConfig';
import { registerUser, loginUser,
  googleSignup,
  createTodo,
  getTodoList,
  getCurrentUser,
  getTodoItem,
  createTask,
  completeTask,
  setTaskDueDate,
  getTasks,
  editProfile,
  profilePicture,
  changePassword,
  editTask,
  addCollaborator,
  deleteTask,
  sendEmailForReset
} from '../actions/actionCreators';

const instance = axios.create({
  baseURL: 'http://localhost:3000/#/'
});

const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
  username: 'terungwa',
  email: 'terungwa@gmail.com',
  id: 1 }, 'my dog bush');

// intercept requests and add authorization token
instance.interceptors.request.use(axiosConfig(token));

const initialRegisterState = {
  error: '',
  currentlySending: false
};

const initialLoginState = {
  error: '',
  sending: false,
  loggedIn: false,
  currentlySending: false
};

const initialGoogleState = {
  success: false
};

const initialTodoState = {
  currentlySending: false,
  todolists: [],
  todo: {},
  todoItem: {}
};

const initialUserState = {
  user: {}
};

const initialTaskState = {
  currentlySending: false,
  tasks: [],
  task: {},
  completed: false,
  taskDate: {}
};

const initialProfileState = {
  success: false,
  sending: false
};


const initialCollaboratorState = {
  success: {}
};

const initialresetPasswordState = {
  success: {}
};

const initialforgotPasswordState = {
  success: {}
};

describe('Action creator services: ', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('User Registration', () => {
    it('should dispatch SET_AUTH on successfully creating users', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialRegisterState,
        });
      });
      const expectedActions = [
        { type: 'SET_AUTH', newAuthState: true }];
      const store = mockStore({});
      const data = { username: 'albert', password: 'albert', email: 'albert@gmail.com' };
      return store.dispatch(registerUser({ data })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });

    it('should call dispatch function on a register user post request', () => {
      // Match against an exact URL value
      moxios.stubRequest('/api/user/signup', {
        status: 200,
        responseText: 'hello'
      });

      let dispatch = jest.fn();
      // let onFulfilled = sinon.spy()
      axios.post('/api/user/signup').then(dispatch);

      moxios.wait(() => {
        equal(dispatch.getCall(0).args[0].data, 'hello');
      });
    });

    it('should dispatch SET_ERROR_STATE on unsuccessfully creating users', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialRegisterState,
        });
      });
      const expectedActions = [
        { type: 'SET_ERROR', value: true }];
      const store = mockStore({});
      const data = { username: 'albert', password: 'albert' };
      return store.dispatch(registerUser({ data })).catch(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('User login', () => {
    it('should dispatch SET_AUTH on successfully login a user', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialLoginState,
        });
      });
      const expectedActions = [
        { type: 'SET_AUTH', newAuthState: true }];
      const store = mockStore({});
      const data = { username: 'albert', password: 'albert', email: 'albert@gmail.com' };
      return store.dispatch(loginUser({ data })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Google sign up', () => {
    it('should dispatch SET_AUTH on successfully google sign up a user', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialGoogleState,
        });
      });
      const expectedActions = [
        { type: 'SET_AUTH', newAuthState: true }];
      const store = mockStore({});
      const data = { username: 'albert', password: 'albert', email: 'albert@gmail.com' };
      return store.dispatch(googleSignup({ data })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Create a todo', () => {
    it('should dispatch CREATED_TODO on successfully creating a todo', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTodoState,
        });
      });
      const expectedActions = [
        { type: 'CREATE_TODO',
          value: {
            currentlySending: false,
            todolists: [],
            todo: {},
            todoItem: {}
          } }];
      const store = mockStore({});
      const data = { todo: 'albert' };
      return store.dispatch(createTodo({ data })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Get todos', () => {
    it('should dispatch GET_TODOLISTS on successfully creating a todo', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTodoState,
        });
      });
      const expectedActions = [
        { type: 'GET_TODOLISTS',
          value: {
            currentlySending: false,
            todolists: [],
            todo: {},
            todoItem: {}
          } }];
      const store = mockStore({});
      return store.dispatch(getTodoList()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Get Current User', () => {
    it('should dispatch GET_CURRENT_USER on successfully getting a user', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialUserState,
        });
      });
      const expectedActions = [
        { type: 'GET_CURRENT_USER',
          value: {
            user: {}
          } }];
      const store = mockStore({});
      return store.dispatch(getCurrentUser()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Get a todo', () => {
    it('should dispatch GET_TODO_ITEM_ID on successfully getting a todo', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTodoState,
        });
      });
      const expectedActions = [
        { type: 'GET_TODO_ITEM_ID',
          value: {
            currentlySending: false,
            todolists: [],
            todo: {},
            todoItem: {}
          } }];
      const store = mockStore({});
      return store.dispatch(getTodoItem()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Create a task', () => {
    it('should dispatch CREATE_TASK on successfully creating a task', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTaskState,
        });
      });
      const expectedActions = [
        { type: 'CREATE_TASK',
          value: {
            completed: false,
            currentlySending: false,
            task: {},
            taskDate: {},
            tasks: []
          } }];
      const store = mockStore({});
      return store.dispatch(createTask({ task: 'new task' }, 1, 'normal')).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Complete a task', () => {
    it('should dispatch COMPLETE_TASK_UPDATE on successfully completing a task', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTaskState,
        });
      });
      const expectedActions = [
        { type: 'COMPLETE_TASK_UPDATE',
          value: {
            completed: false,
            currentlySending: false,
            task: {},
            taskDate: {},
            tasks: []
          } }];
      const store = mockStore({});
      return store.dispatch(completeTask()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Task due date', () => {
    it('should dispatch TASK_CREATION_AND_DUE_DATE on successfully setting a due date', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTaskState,
        });
      });
      const expectedActions = [
        { type: 'TASK_CREATION_AND_DUE_DATE',
          value: {
            completed: false,
            currentlySending: false,
            task: {},
            taskDate: {},
            tasks: []
          } }];
      const store = mockStore({});
      return store.dispatch(setTaskDueDate()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Task due date', () => {
    it('should dispatch GET_TASKS on successfully getting tasks', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTaskState,
        });
      });
      const expectedActions = [
        { type: 'GET_TASKS',
          value: {
            completed: false,
            currentlySending: false,
            task: {},
            taskDate: {},
            tasks: []
          } }];
      const store = mockStore({});
      return store.dispatch(getTasks()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Add collaborator', () => {
    it('should dispatch ADDED_COLLABORATOR_SUCCESS on successfully adding a collaborator', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialCollaboratorState,
        });
      });
      const expectedActions = [
        { type: 'ADDED_COLLABORATOR_SUCCESS',
          value: {
            success: {}
          } }];
      const store = mockStore({});
      return store.dispatch(addCollaborator()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Edit task', () => {
    it('should dispatch EDITING_TASK on successfully editing a task', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTaskState,
        });
      });
      const expectedActions = [
        { type: 'EDITING_TASK',
          value: false }];
      const store = mockStore({});
      return store.dispatch(editTask()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Profile Picture', () => {
    it('should dispatch CHANGE_PROFILE_SUCCESS on successfully changing a profile pic', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialProfileState,
        });
      });
      const expectedActions = [
        { type: 'CHANGE_PROFILE_SUCCESS',
          value: true }];
      const store = mockStore({});
      return store.dispatch(profilePicture({ imageUrl: '/image' })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Change Password', () => {
    it('should dispatch PASSWORD_RESET_SUCCESS on successfully reseting password', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialresetPasswordState,
        });
      });
      const expectedActions = [
        { type: 'PASSWORD_RESET_SUCCESS',
          value: {
            success: {}
          } }];
      const store = mockStore({});
      return store.dispatch(changePassword({ imageUrl: '/image' })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Edit profile', () => {
    it('should dispatch PASSWORD_RESET_SUCCESS on successfully reseting password', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialProfileState,
        });
      });
      const expectedActions = [
        { type: 'CHANGE_PROFILE_SUCCESS',
          value: true }];
      const store = mockStore({});
      return store.dispatch(editProfile()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Delete task', () => {
    it('should dispatch TASK_IS_DELETED on successfully deleting a task', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialTaskState,
        });
      });
      const expectedActions = [
        { type: 'TASK_IS_DELETED',
          value: true }];
      const store = mockStore({});
      return store.dispatch(deleteTask({ todoId: '12345', taskInfo: '43435' })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });

  describe('Delete task', () => {
    it('should dispatch TASK_IS_DELETED on successfully deleting a task', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: initialforgotPasswordState,
        });
      });
      const expectedActions = [
        { type: 'EMAIL_SUCCESS',
          value: {
            success: {}
          } }];
      const store = mockStore({});
      return store.dispatch(sendEmailForReset()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      }
      );
    });
  });
});

