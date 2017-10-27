import React from 'react';

const Header = () => (
  <div>
    <header id='header' className='page-topbar'>
      <nav className='transparent z-depth-0'>
        <div className='nav-wrapper'>
          <a className='brand-logo black-text left'>
            <img
              className='sigu-brand'
              width='120'
              src='https://res.cloudinary.com/doy0uyv63/image/upload/v1509116080/Logomakr_6OM41h_nisjmo.png'
              alt=''
            />
          </a>
          <ul className='right nav-profile'>
            <li>
              <a id='dropProfiles'>
                <span className='black-text'>Terungwa</span>
                <img
                  src='https://res.cloudinary.com/doy0uyv63/image/upload/v1503650055/avatar_us3xoy.png'
                  className='responsive-img circle right profile-img'
                  width='40'
                  alt=''
                />
              </a>
            </li>

            <li>
              <a
                id='dropProfile'
                className='responsive'
              >
                <span className='black-text'>logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
);

export default Header;
