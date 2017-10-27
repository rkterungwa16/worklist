import React from 'react';
import TaskPage from './TaskPage';
import TodoPage from './TodoPage';
import DashboardHeader from '../components/DashboardHeader';

const Dashboard = () => (
  <div className='row blue darken-1'>
    <DashboardHeader />
    <TodoPage />
    <TaskPage />
  </div>
);

export default Dashboard;
