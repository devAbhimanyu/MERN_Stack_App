import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import ProfileAbout from '../../../components/Profile/ProfileAbout';
import ProfileExp from '../../../components/Profile/ProfileExp';
import GithubRepo from './GithubRepos';
import { getProfileFromUserHandle } from '../../../store/actions/profile.action';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profileRed.profile === null && this.props.profileRed.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profileRed;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Modal show={true}><Spinner message={`Loading ${this.props.match.params.handle}'s profile`} /></Modal>;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileExp education={profile.education} experience={profile.experience} />
          {profile.githubUserName ? (<GithubRepo username={profile.githubUserName} />) : null}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profileRed: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profileRed: state.profileReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfileByHandle: (userHandle) => dispatch(getProfileFromUserHandle(userHandle))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);