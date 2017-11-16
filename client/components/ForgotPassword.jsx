import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => (
  <div>
    <div className='row center'>
      <div className='col s12 m5 l5 offset-s1 offset-m3 offset-l3'>
        <div className='card white'>
          <div className='card-content black-text'>
            <div id='signup'>
              <div className='row center' id='RegisterCard'>
                <h4 className='center-align'>Forgot Password?</h4>
                <ForgotPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ForgotPassword;
