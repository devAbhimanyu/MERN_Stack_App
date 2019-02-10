import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../store/actions/profile.action';
import ModalScreen from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProfileModifier from '../../components/Profile/ProfileModifier';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getProfile();
    }

    onDeleteHandler = () => {
        this.props.deleteUserAccount();
    }

    render() {
        const { user } = this.props.authRed;
        const { profile, loading } = this.props.profileRed;

        let dashboardView = null;

        if (profile === null || loading) {
            dashboardView = <ModalScreen show={true}><Spinner /></ModalScreen>
        } else {
            //check whether a profile exists or not
            if (Object.keys(profile).length > 0) {
                dashboardView = <div className="lead text-muted">
                    <p className="lead text-muted">
                        Welcome <Link to={`/profile/${user.name}`}>{user.name}</Link>
                    </p>
                    <ProfileModifier />
                    <div style={{ marginBottom: '60px' }}></div>
                    <button className="btn btn-danger" onClick={this.onDeleteHandler}>Delete Account</button>
                </div>
            } else {
                //create profile
                dashboardView = (
                    <React.Fragment>
                        <div>
                            <div className="lead text-muted"> Welcome {user.name}</div>
                            <p>Please Update Your Profile To Continue</p>
                            <Link to='/create-profile' className='btn btn-lg btn-info' >Create Profile</Link>
                        </div>
                    </React.Fragment>
                )
            }
        }

        return (
            <div className='dashboard'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardView}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Dashboard.proptype = {
    getProfile: Proptypes.func.isRequired,
    deleteUserAccount: Proptypes.func.isRequired,
    authRed: Proptypes.object.isRequired,
    profileRed: Proptypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        authRed: state.authReducer,
        profileRed: state.profileReducer,
        errorsRed: state.errorsReduder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(getCurrentProfile()),
        deleteUserAccount: () => dispatch(deleteAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);