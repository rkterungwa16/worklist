import React from 'react';
import localStorage from 'localStorage';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCurrentUser,
  setAuthState,
  userLogout
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
    this.props.getCurrentUser()
      .then(() => {
        $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: false, // Displays dropdown below the button
          alignment: 'left', // Displays dropdown with edge aligned to the left of button
          stopPropagation: false // Stops event propagation
        }
        );
      });
  }

  /**
   * @param {string} value
   * @return {*} null
   */
  logoutUser() {
    this.clear = '';
    localStorage.clear();
    this.props.setAuthState(false);
    this.props.userLogout(true);
  }

  /**
  * Create a template for a navigation bar
  * @returns {object} a template of a navigation bar.
  */
  render() {
    const { username, image } = this.props.user;
    return (
      <div>
        <header id='header' className='page-topbar'>
          <nav className='transparent z-depth-0'>
            <div className='nav-wrapper'>
              <a className='brand-logo black-text left'>
                <img
                  className='sigu-brand logo'
                  width='120'
                  src='https://res.cloudinary.com/doy0uyv63/image/upload/v1510395854/Logomakr_2UJado_bdgm4v.png'
                  alt=''
                />
              </a>
              <ul className='right nav-profile'>
                <li className='nav-img'>
                  <a
                    id='profile-dropdown'
                    data-activates='dropdown'
                    className='profile-nav dropdown-button'
                    data-beloworigin='true'
                  >
                    <span className='black-text'>
                      {username}
                    </span>
                    <img
                      src={image}
                      className='responsive-img circle right profile-img'
                      width='40'
                      alt=''
                    />
                    <i
                      className='material-icons'
                    >
                      arrow_drop_down
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <ul
            id='dropdown'
            className='dropdown-content collection'
          >
            <li
              className='collection-item'
            >
              <Link
                id='edit-profile-link'
                to={'/edit-profile'}
                className='black-text'
              >
                Edit profile
              </Link>
            </li>

            <li
              className='collection-item'
            >
              <Link
                id='change-profile-pic-link'
                to={'/change-profile-picture'}
                className='black-text'
              >
                Change profile Picture
              </Link>
            </li>

            <li
              className='collection-item'
            >
              <a
                id='logout-link'
                className='responsive'
                onClick={this.logoutUser}
                role='button'
                tabIndex='0'
              >
                <span className='black-text'>Logout</span>
              </a>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  getCurrentUser: React.PropTypes.func.isRequired,
  setAuthState: React.PropTypes.func.isRequired,
  userLogout: React.PropTypes.func.isRequired,
  user: React.PropTypes.shape({
    username: '',
    image: ''
  }).isRequired,
};

const matchDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser,
  setAuthState,
  userLogout
}, dispatch);

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps,
  matchDispatchToProps)(Header);

