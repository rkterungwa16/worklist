import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCurrentUser
} from '../actions/actionCreators';

/**
* MessageNavBar component
*/
class Header extends React.Component {
  /**
  * @param {objec} props for first parameter
  */
  constructor(props) {
    super(props);
    this.value = '';
  }

  /**
   * A react lifecycle method
   * Load jquery with materialize methods when component mounts
   * @memberof Login
   * @return {*} null
   */
  componentDidMount() {
    this.props.getCurrentUser();
    console.log('MY COMPONENT WILL MOUNT');
  }

  /**
  * Create a template for a navigation bar
  * @returns {object} a template of a navigation bar.
  */
  render() {
    console.log('DASHBOARD HEADER', this.props.user.username);
    const { username } = this.props.user;
    return (
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
                  <Link
                    to={'/edit-profile'}
                  >
                    <span className='black-text'>
                      {username}
                    </span>
                    <img
                      src='https://res.cloudinary.com/doy0uyv63/image/upload/v1503650055/avatar_us3xoy.png'
                      className='responsive-img circle right profile-img'
                      width='40'
                      alt=''
                    />
                  </Link>
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
  }
}

Header.propTypes = {
  username: React.PropTypes.string.isRequired,
  getCurrentUser: React.PropTypes.func.isRequired
};

const matchDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser
}, dispatch);

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps,
  matchDispatchToProps)(Header);

