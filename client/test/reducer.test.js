import authReducer from '../reducers/authReducer';
import collaboratorReducer from '../reducers/collaboratorReducer';
import errorReducer from '../reducers/errorReducer';
import logoutReducer from '../reducers/logoutReducer';
import profileReducer from '../reducers/profileReducer';
import resetPasswordReducer from '../reducers/resetPasswordReducer';
import taskReducer from '../reducers/taskReducer';
import todoListReducer from '../reducers/todoListReducer';
import userReducer from '../reducers/userReducer';

describe('Auth reducer', () => {
  it('should set the authentication of a logged in user', () => {
    const action = {
      type: 'SET_AUTH',
      newAuthState: true
    };

    const newState = authReducer(undefined, action);
    expect(newState.loggedIn).toEqual(action.newAuthState);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      newAuthState: true
    };

    const newState = authReducer(undefined, action);
    expect(newState.loggedIn).toEqual(false);
  });
});

describe('Collaborator reducer', () => {
  it('should return info for successfully added collaborator', () => {
    const action = {
      type: 'ADDED_COLLABORATOR_SUCCESS',
      value: { success: { status: 'success' } }
    };

    const newState = collaboratorReducer(undefined, action);
    expect(newState.success).toEqual(action.value);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: { status: 'success' }
    };

    const newState = collaboratorReducer(undefined, action);
    expect(newState.success).toEqual({});
  });
});

describe('Error reducer', () => {
  it('should set an error message for wrong signup', () => {
    const action = {
      type: 'SET_SIGNUP_ERROR',
      value: 'Please enter your email'
    };

    const newState = errorReducer(undefined, action);
    expect(newState.signupError).toEqual(action.value);
  });

  it('should set an error message for wrong login', () => {
    const action = {
      type: 'SET_LOGIN_ERROR',
      value: 'Please enter your email'
    };

    const newState = errorReducer(undefined, action);
    expect(newState.loginError).toEqual(action.value);
  });

  it('should set an error message for empty todo', () => {
    const action = {
      type: 'SET_TODO_FORM_ERROR',
      value: 'Please enter your todo'
    };

    const newState = errorReducer(undefined, action);
    expect(newState.todoFormError).toEqual(action.value);
  });

  it('should set an error message for empty task', () => {
    const action = {
      type: 'SET_TASK_FORM_ERROR',
      value: 'Please enter your task'
    };

    const newState = errorReducer(undefined, action);
    expect(newState.taskFormError).toEqual(action.value);
  });

  it('should set an error message for wrong profile form info', () => {
    const action = {
      type: 'SET_EDIT_PROFILE_ERROR',
      value: 'Please enter your email'
    };

    const newState = errorReducer(undefined, action);
    expect(newState.editProfileFormError).toEqual(action.value);
  });

  it('should set an error message for wrong collaborator email', () => {
    const action = {
      type: 'COLLABORATOR_FORM_ERROR',
      value: 'Please enter collaborator email'
    };

    const newState = errorReducer(undefined, action);
    expect(newState.collaboratorFormError).toEqual(action.value);
  });

  it('should set an error message for wrong reset info', () => {
    const action = {
      type: 'PASSWORD_RESET_FORM_ERROR',
      value: 'Please enter your email'
    };

    const newState = errorReducer(undefined, action);
    expect(newState.resetPasswordFormError).toEqual(action.value);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: {
        collaboratorFormError: 'another error'
      }
    };

    const newState = errorReducer(undefined, action);
    expect(newState.collaboratorFormError).toEqual('');
  });
});

describe('Log out a user', () => {
  it('should confirm that a user is successfully logged out', () => {
    const action = {
      type: 'USER_LOGOUT',
      value: {
        loggedOut: true
      }
    };

    const newState = logoutReducer(undefined, action);
    expect(newState.loggedOut).toEqual(action.value);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: {
        loggedOut: true
      }
    };

    const newState = logoutReducer(undefined, action);
    expect(newState.loggedOut).toEqual(false);
  });
});

describe('Profile editing', () => {
  it('should confirm that a user has changed profile successfully', () => {
    const action = {
      type: 'CHANGE_PROFILE_SUCCESS',
      value: {
        success: true
      }
    };

    const newState = profileReducer(undefined, action);
    expect(newState.success).toEqual(action.value);
  });

  it('should confirm that a profile change request is being sent', () => {
    const action = {
      type: 'SENDING_REQUEST',
      value: {
        sending: true
      }
    };

    const newState = profileReducer(undefined, action);
    expect(newState.sending).toEqual(action.value);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: {
        success: true
      }
    };

    const newState = profileReducer(undefined, action);
    expect(newState.success).toEqual(false);
  });
});

describe('Reset password', () => {
  it('should confirm that password successfully reset', () => {
    const action = {
      type: 'PASSWORD_RESET_SUCCESS',
      value: {
        success: {
          status: 'success'
        }
      }
    };

    const newState = resetPasswordReducer(undefined, action);
    expect(newState.success).toEqual(action.value);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: {
        success: {
          status: 'success'
        }
      }
    };

    const newState = resetPasswordReducer(undefined, action);
    expect(newState.success).toEqual({});
  });
});


describe('Task reducer', () => {
  it('should get tasks', () => {
    const action = {
      type: 'GET_TASKS',
      value: {
        tasks: ['tasks']
      }
    };

    const newState = taskReducer(undefined, action);
    expect(newState.tasks).toEqual(action.value);
  });

  it('should add created task to existing tasks', () => {
    const action = {
      type: 'CREATE_TASK',
      value: {
        task: 'tasks'
      }
    };

    const newState = taskReducer(undefined, action);
    expect(newState.tasks).toEqual(['tasks']);
  });

  it('should set the due date for a task', () => {
    const action = {
      type: 'TASK_CREATION_AND_DUE_DATE',
      value: {
        taskDate: '12/11/17'
      }
    };

    const newState = taskReducer(undefined, action);
    expect(newState.taskDate).toEqual(action.value);
  });

  it('should set completion status for task', () => {
    const action = {
      type: 'COMPLETE_TASK_UPDATE',
      value: {
        completed: {
          completed: true
        }
      }
    };

    const newState = taskReducer(undefined, action);
    expect(newState.completed).toEqual(action.value);
  });

  it('should set delete status of a task', () => {
    const action = {
      type: 'TASK_IS_DELETED',
      value: {
        deleted: true
      }
    };

    const newState = taskReducer(undefined, action);
    expect(newState.deleted).toEqual(action.value);
  });

  it('should set edit status of a task', () => {
    const action = {
      type: 'EDITING_TASK',
      value: {
        editing: true
      }
    };

    const newState = taskReducer(undefined, action);
    expect(newState.editing).toEqual(action.value);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: {
        tasks: ['tasks']
      }
    };

    const newState = taskReducer(undefined, action);
    expect(newState.tasks).toEqual([]);
  });
});

describe('Todo List Reducer', () => {
  it('should get todo list', () => {
    const action = {
      type: 'GET_TODOLISTS',
      value: {
        todolists: ['my-todo']
      }
    };

    const newState = todoListReducer(undefined, action);
    expect(newState.todolists).toEqual(action.value);
  });

  it('should update todo list', () => {
    const action = {
      type: 'UPDATE_TODO',
      value: {
        todolists: ['my-todo']
      }
    };

    const newState = todoListReducer(undefined, action);
    expect(newState.todolists).toEqual(action.value);
  });

  it('should get todo item', () => {
    const action = {
      type: 'GET_TODO_ITEM_ID',
      value: {
        todo: { todo: ['my-todo'] }
      }
    };

    const newState = todoListReducer(undefined, action);
    expect(newState.todo).toEqual(action.value);
  });

  it('should create a todo and append to todolist', () => {
    const action = {
      type: 'CREATE_TODO',
      value: {
        createdTodo: 'new-todo'
      }
    };

    const newState = todoListReducer(undefined, action);
    expect(newState.todolists).toEqual(['new-todo']);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: {
        todolists: ['my-todo']
      }
    };

    const newState = todoListReducer(undefined, action);
    expect(newState.todolists).toEqual([]);
  });
});

describe('User reducer', () => {
  it('should confirm that a user is successfully logged out', () => {
    const action = {
      type: 'GET_CURRENT_USER',
      value: {
        user: {
          username: 'terungwa'
        }
      }
    };

    const newState = userReducer(undefined, action);
    expect(newState.user).toEqual(action.value);
  });

  it('should return default state for an unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      value: {
        user: {
          username: 'rich'
        }
      }
    };

    const newState = userReducer(undefined, action);
    expect(newState.user).toEqual({});
  });
});
