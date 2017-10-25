import React from 'react';

const TodoListItem = () => (
  <div>
    <div className='collection'>
      <a href='#!' className='collection-item'>
        <span className='badge'>due date</span>
          Learn Javascript
      </a>
      <a href='#!' className='collection-item'>
        <span className='new badge'>4</span>
        Learn Node.js
      </a>
      <a href='#!' className='collection-item'>
        Learn Ruby on Rails
      </a>
      <a href='#!' className='collection-item'>
        <span className='badge'>14</span>Learn Python
      </a>
    </div>
  </div>
);

export default TodoListItem;
