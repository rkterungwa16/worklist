import React from 'react';
import TaskPage from './TaskPage';
import TodoPage from './TodoPage';

const Dashboard = () => (
  <div className='row'>
    <TodoPage />
    <TaskPage />
  </div>
);

export default Dashboard;
