import React from 'react';

const Header = () => (
  <div>
    <header id='header' className='page-topbar'>
      <nav className='transparent z-depth-0'>
        <div className='nav-wrapper'>
          <a className='brand-logo black-text left'>
            <h4>WorkList</h4>
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
