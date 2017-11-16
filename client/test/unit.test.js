import {
  collaboratorFormValidation,
  editProfileFormValidation,
  loginFormValidation,
  signupFormValidation,
  taskFormValidation,
  todoFormValidation,
  resetPasswordFormValidation
} from '../helper/formValidation';
import axiosConfig from '../helper/axiosConfig';
import {
  checkPriority,
  checkCompletion,
  checkStateDueDate
} from '../helper/taskVariableCheck';


describe('Collaborator form', () => {
  it('should return "Please enter collaborator email" for an empty email', () => {
    const value = collaboratorFormValidation({ email: '' });
    expect(value).toEqual('Please enter collaborator email');
  });

  it('should return true for an input email', () => {
    const value = collaboratorFormValidation({ email: 'john@email.com' });
    expect(value).toEqual(true);
  });
});

describe('Edit profile form', () => {
  it('should return "Your password and confirm password does not match" for un-matched password', () => {
    const value = editProfileFormValidation({
      password: 'john',
      confirmPassword: 'jane'
    });
    expect(value).toEqual('Your password and confirm password does not match');
  });

  it('should return "Please enter your current password" for no current password', () => {
    const value = editProfileFormValidation({
      password: 'john',
      confirmPassword: 'john'
    });
    expect(value).toEqual('Please enter your current password');
  });

  it('should return true for matching passwords', () => {
    const value = editProfileFormValidation({
      password: 'john',
      confirmPassword: 'john',
      currentPassword: 'john'
    });
    expect(value).toEqual(true);
  });
});

describe('Login form', () => {

  it('should return "Please enter your details" for empty form fields', () => {
    const value = loginFormValidation({
      email: '',
      password: ''
    });
    expect(value).toEqual('Please enter your details');
  });

  it('should return "Please enter your email" when there is no email input', () => {
    const value = loginFormValidation({
      email: '',
      password: 'john'
    });
    expect(value).toEqual('Please enter your email');
  });

  it('should return "Please enter your password" when there is no password input', () => {
    const value = loginFormValidation({
      email: 'john@gmail.com',
      password: ''
    });
    expect(value).toEqual('Please enter your password');
  });

  it('should return "Email is invalid" when email is invalid', () => {
    const value = loginFormValidation({
      email: 'john',
      password: 'john'
    });
    expect(value).toEqual('Email is invalid');
  });

  it('should return true when all data provided is valid', () => {
    const value = loginFormValidation({
      email: 'john@gmail.com',
      password: 'john'
    });
    expect(value).toEqual(true);
  });
});

describe('Signup form', () => {
  it('should return "Please enter your details" for empty form fields', () => {
    const value = signupFormValidation({
      email: '',
      password: '',
      username: ''
    });
    expect(value).toEqual('Please enter your details');
  });

  it('should return "Please enter your email" when there is no email input', () => {
    const value = signupFormValidation({
      email: '',
      password: 'john',
      username: 'john'
    });
    expect(value).toEqual('Please enter your email');
  });

  it('should return "Please enter your password" when there is no password input', () => {
    const value = signupFormValidation({
      email: 'john@gmail.com',
      password: '',
      username: 'john'
    });
    expect(value).toEqual('Please enter your password');
  });

  it('should return "Please enter your username" when there is no username input', () => {
    const value = signupFormValidation({
      email: 'john@gmail.com',
      password: 'john',
      username: ''
    });
    expect(value).toEqual('Please enter your username');
  });

  it('should return "Email is invalid" when email is invalid', () => {
    const value = signupFormValidation({
      email: 'john',
      password: 'john',
      username: 'john'
    });
    expect(value).toEqual('Email is invalid');
  });

  it('should return true when all data provided is valid', () => {
    const value = signupFormValidation({
      email: 'john@gmail.com',
      password: 'john',
      username: 'john'
    });
    expect(value).toEqual(true);
  });
});

describe('Task form', () => {
  it('should return "Please enter your task" for an empty task', () => {
    const value = taskFormValidation({ task: '' });
    expect(value).toEqual('Please enter your task');
  });

  it('should return true for a task', () => {
    const value = taskFormValidation({ task: 'john' });
    expect(value).toEqual(true);
  });
});

describe('Todo form', () => {
  it('should return "Please enter your todo" for an empty todo', () => {
    const value = todoFormValidation({ todo: '' });
    expect(value).toEqual('Please enter your todo');
  });

  it('should return true for a todo', () => {
    const value = todoFormValidation({ todo: 'john' });
    expect(value).toEqual(true);
  });
});

describe('Check priority', () => {
  it('should return "task-cat yellow" for an urgent task', () => {
    const value = checkPriority('urgent');
    expect(value).toEqual('task-cat yellow');
  });

  it('should return "task-cat red" for a critical task', () => {
    const value = checkPriority('critical');
    expect(value).toEqual('task-cat red');
  });

  it('should return "task-cat green" for a normal task', () => {
    const value = checkPriority('normal');
    expect(value).toEqual('task-cat green');
  });
});

describe('Check completion', () => {
  it('should return "completed" for a completed task', () => {
    const value = checkCompletion(true);
    expect(value).toEqual('completed');
  });

  it('should return "" for an uncompleted task', () => {
    const value = checkCompletion(false);
    expect(value).toEqual('');
  });
});

describe('Set due data', () => {
  it('should return due date from state', () => {
    const date = '19/11/2017';
    const value = checkStateDueDate(date, '');
    expect(value).toEqual(date);
  });

  it('should return due date from props', () => {
    const date = '19/11/2017';
    const value = checkStateDueDate('', date);
    expect(value).toEqual(date);
  });
});

describe('Axios token configuration', () => {
  it('should return null for a null token', () => {
    const value = axiosConfig('');
    expect(value).toEqual(null);
  });
});

describe('Reset Password form', () => {

  it('should return "Please enter your details" for empty form fields', () => {
    const value = resetPasswordFormValidation({
      email: '',
      password: ''
    });
    expect(value).toEqual('Please enter your details');
  });

  it('should return "Please enter your email" when there is no email input', () => {
    const value = resetPasswordFormValidation({
      email: '',
      password: 'john',
      confirmPassword: ''
    });
    expect(value).toEqual('Please enter your email');
  });

  it('should return "Please enter your password" when there is no password input', () => {
    const value = resetPasswordFormValidation({
      email: 'john@gmail.com',
      password: '',
      confirmPassword: ''

    });
    expect(value).toEqual('Please enter your password');
  });

  it('should return "Email is invalid" when email is invalid', () => {
    const value = resetPasswordFormValidation({
      email: 'john',
      password: 'john',
      confirmPassword: 'john'
    });
    expect(value).toEqual('Email is invalid');
  });

  it('should return "Your entry does not match" password not equal confirm password', () => {
    const value = resetPasswordFormValidation({
      email: 'john@gmail.com',
      password: 'john2',
      confirmPassword: 'john'
    });
    expect(value).toEqual('Your entry does not match');
  });

  it('should return true when all data provided is valid', () => {
    const value = resetPasswordFormValidation({
      email: 'john@gmail.com',
      password: 'john',
      confirmPassword: 'john'
    });
    expect(value).toEqual(true);
  });
});
