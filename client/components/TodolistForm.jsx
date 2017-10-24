import React from 'react';

const TodoListForm = () => (
  <form className='col s12'>
    <div className='row'>
      <div className='input-field col s12'>
        <input id='email' type='text' className='validate' placeholder='Todo List' />
      </div>
      <button className='btn waves-effect waves-light red' type='submit' name='action'>
        Create Todo List
      </button>
    </div>
  </form>
);

export default TodoListForm;
