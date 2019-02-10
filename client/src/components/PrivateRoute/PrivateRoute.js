import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

const PrivateRoute = ({ component: Component, authRed, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                authRed.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (<Redirect to='/login' />)
            )

            }
        />
    )
}
PrivateRoute.proptype = {
    authRed: Proptypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        authRed: state.authReducer,
    }
}

export default connect(mapStateToProps)(PrivateRoute)
