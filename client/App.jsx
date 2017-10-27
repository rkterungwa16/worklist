
import React from 'react';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';

/**
* Application Home page
* @param {object} props application props
* @return {obj} a template of the application home page.
*/


const App = () => (
  <div>
    <Header />
    <SignupPage />
  </div>
);

export default App;

