
import React from 'react';

const TodoListForm = () => (
  <form className='col s12'>
    <div className='row col s12 m6 l6'>
      <div className='input-field'>
        <input id='email' type='text' className='validate' placeholder='Todo List Tasks' />
      </div>
      <br />
      <div>
        <button className='btn waves-effect waves-light red' type='submit' name='action'>
          Add Task
        </button>
        <a className='btn waves-effect waves-light white black-text' type='submit' name='action'>
          Cancel
        </a>
      </div>
    </div>
  </form>
);

export default TodoListForm;

