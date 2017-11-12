import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import Dropzone from 'react-dropzone';
import {
  profilePicture,
  sendingRequest
} from '../actions/actionCreators';

/**
* Edit profile form for the application
*/
class ChangeProfilePicture extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };
    this.fileUpload.bind(this);
  }

  /**
   *
   * @param {*} files
   * @return {*} null
   */
  fileUpload(files) {
    this.file = '';
    const cloudName = 'doy0uyv63';
    const preset = 'terunkom';
    const apiKey = '811718711578253';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset);
      formData.append('api_key', apiKey);
      formData.append('timestamp', (Date.now() / 1000));

      this.props.sendingRequest(true);
      return axios.post(url, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }).then((response) => {
        const data = response.data;
        this.props.profilePicture(data.secure_url);
        this.props.sendingRequest(false);
      });
    });
  }

  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    // console.log('THIS IS THE PROPS', this.props.profilePicture('files'));
    const { profilePicture, sendingRequest } = this.props;
    const { success, sending } = this.props.profile;
    return (

      <div>
        {
          success ?
            <Redirect to='/dashboard' />
            :
            <div className='row center'>
              <div className='col s12 m5 l5 offset-s1 offset-m3 offset-l3'>
                {
                  sending ?
                    <Spinner
                      size={120}
                      className='spinner'
                      spinnerColor={'#454545'}
                      spinnerWidth={2}
                      visible
                    />
                    :
                    <div className='card white'>
                      <div className='card-content black-text'>
                        <div>
                          <div className='row center' id='RegisterCard'>
                            <h4 className='center-align'>Change Profile Picture</h4>
                            <div className='profile-picture'>
                              <Dropzone
                                onDrop={this.fileUpload}
                                profilePicture={profilePicture}
                                sendingRequest={sendingRequest}
                              >
                                <p>
                                Try dropping some files here,
                                or click to select files to upload.
                                </p>
                              </Dropzone>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                }
              </div>
            </div>
        }
      </div>
    );
  }
}

ChangeProfilePicture.propTypes = {
  profilePicture: React.PropTypes.func.isRequired,
  sendingRequest: React.PropTypes.func.isRequired,
  profile: PropTypes.Object,
};

ChangeProfilePicture.defaultProps = {
  error: {
    todoFormError: ''
  },
  profile: {
    success: false
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({
  profilePicture,
  sendingRequest
}, dispatch);

const mapStateToProps = state => ({
  error: state.error,
  profile: state.profile
});

export default connect(mapStateToProps,
  matchDispatchToProps)(ChangeProfilePicture);

