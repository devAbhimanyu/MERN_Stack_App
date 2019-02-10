import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../store/actions/auth.action';
import { clearCurrentProfile } from '../../../store/actions/profile.action';

class NavBar extends Component {
    onLogoutHandler = (e) => {
        e.preventDefault();
        this.props.clearProfile();
        this.props.logoutCurrentUser();

    }

    render() {
        const { isAuthenticated, user } = this.props.authRed;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <a href='' className="nav-link" onClick={this.onLogoutHandler}>
                        <img src={user.avatar}
                            className='rounded-circle'
                            alt={user.name}
                            style={{
                                width: '25px',
                                marginRight: '5px',
                            }}
                            title='You must have a gravatar connected to you email to display image'
                        />{' '}
                        Logout</a>
                </li>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>

        )

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">DevConnector</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="profiles.html"> Developers  </a>
                                </li>
                            </ul>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

NavBar.propTypes = {
    logoutCurrentUser: Proptypes.func.isRequired,
    clearProfile: Proptypes.func.isRequired,
    authRed: Proptypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        authRed: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutCurrentUser: () => dispatch(logoutUser()),
        clearProfile: () => dispatch(clearCurrentProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);