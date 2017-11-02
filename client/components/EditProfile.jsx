import React from 'react';
import EditProfileForm from './EditProfileForm';

const EditProfile = () => (
  <div>
    <div className='row center'>
      <div className='col s12 m5 l5 offset-s1 offset-m3 offset-l3'>
        <div className='card blue darken-1'>
          <div className='card-content black-text'>
            <div id='signup'>
              <div className='row center' id='RegisterCard'>
                <h4 className='center-align'>Edith Profile</h4>
                <EditProfileForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EditProfile;
