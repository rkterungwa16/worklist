import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <div className='content'>
      <div className='row'>
        <div id='site-layout-example-top' className='col s12'>
          <p
            className='flat-text-logo center white-text caption-uppercase'
          >Sorry but we couldn’t find this page :(
          </p>
        </div>
        <div id='site-layout-example-right' className='col s12 m12 l12'>
          <div className='row center'>
            <h1 className='text-long-shadow col s12 homeText'>404</h1>
          </div>
          <div className='row center'>
            <p className='center white-text col s12'>It seems that this page doesn’t exist.</p>
            <p
              className='center s12'
            >
              <Link
                to='/dashboard'
                className='btn waves-effect waves-light'
              >Go Back
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
