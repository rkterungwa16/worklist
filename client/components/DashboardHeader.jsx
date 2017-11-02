import React from 'react';
import localStorage from 'localStorage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCurrentUser,
  setAuthState
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
    this.logoutUser = this.logoutUser.bind(this);
  }

  /**
   * A react lifecycle method
   * Load jquery with materialize methods when component mounts
   * @memberof Login
   * @return {*} null
   */
  componentDidMount() {
    this.props.getCurrentUser();
  }

  /**
   * @param {string} value
   * @return {*} null
   */
  logoutUser() {
    this.clear = '';
    localStorage.clear();
    this.props.setAuthState(false);
  }

  /**
  * Create a template for a navigation bar
  * @returns {object} a template of a navigation bar.
  */
  render() {
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
                    onClick={this.logoutUser}
                    role='button'
                    tabIndex='0'
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
  getCurrentUser: React.PropTypes.func.isRequired,
  setAuthState: React.PropTypes.func.isRequired,
  user: React.PropTypes.shape({
    username: ''
  }).isRequired,
};

const matchDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser,
  setAuthState
}, dispatch);

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps,
  matchDispatchToProps)(Header);

