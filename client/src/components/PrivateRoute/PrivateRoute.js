import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

const PrivateRoute = ({ component: Component, isLazy, authRed, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (authRed.isAuthenticated) {
                    if (isLazy) {
                        return <Suspense fallback={<div>Loading...</div>}><Component /></Suspense>;
                    } else {
                        return <Component {...props} />;
                    }
                } else {
                    return <Redirect to='/login' />;
                }
            }}
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
