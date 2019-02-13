import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalScreen from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProfileItem from '../../components/Profile/ProfileItem';
import { getAllProfiles } from '../../store/actions/profile.action';

class Profiles extends Component {
    componentDidMount() {
        this.props.getAllProfiles();
    }

    render() {
        const { allProfiles, loading } = this.props.profileRed;
        let profileItems;

        if (allProfiles === null || loading) {
            profileItems = <ModalScreen show={true}><Spinner message='Loading Profiles' /> </ModalScreen>;
        } else {
            if (allProfiles.length > 0) {
                profileItems = allProfiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ));
            } else {
                profileItems = <h4>No profiles found in the current directory...</h4>;
            }
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">
                                Browse and connect with developers
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profileRed: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        profileRed: state.profileReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProfiles: () => dispatch(getAllProfiles())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profiles);