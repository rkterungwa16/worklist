import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import TodolistItem from '../components/TodolistItem';
import TodolistForm from '../components/TodolistForm';

const TaskPage = () => (
  <div className='row'>
    <div className='col s12 m4 l3 color white'>
      <TodolistForm />
      <TodolistItem />
    </div>

    <div className='col s12 m8 l9 red lighten-5'>
      <h4>Learn JavaScript</h4>
      <a className='btn-floating btn waves-effect waves-light red'>
        +
      </a>
      <a href='#' className='black-text'>
        <span>Add Task</span>
      </a>

      <div className='row'>
        <TaskForm />
      </div>

      <TaskItem />
    </div>
  </div>
);

export default TaskPage;
