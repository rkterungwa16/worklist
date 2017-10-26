import React from 'react';

const Header = () => (
  <div>
    <header id='header' className='page-topbar'>
      <nav className='transparent z-depth-0'>
        <div className='nav-wrapper'>
          <a className='brand-logo black-text left'>
            <h4>WorkList</h4>
          </a>
          <a data-activates='slide-out' className='button-collapse show-on-large'>
            <i className='material-icons iconColor'>menu</i>
          </a>
        </div>
      </nav>
    </header>
  </div>
);

export default Header;
