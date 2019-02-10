import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../../store/actions/auth.action'
import TextInput from '../../../components/UI/Input/TextInput';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.authRed.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.authRed.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if (nextProps.errorsRed) {
            this.setState({ errors: nextProps.errorsRed })
        }
    }

    onChangeHandler = (eve) => {
        this.setState({ [eve.target.name]: eve.target.value });
    }

    onSubmitHandler = (eve) => {
        eve.preventDefault();

        const userLogin = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginNewUser(userLogin);
        //console.log(userLogin);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmitHandler}>
                                <TextInput
                                    type={"email"}
                                    name={"email"}
                                    value={this.state.email}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.email}
                                    placeholder={"Email Address"}
                                />
                                <TextInput
                                    type={"password"}
                                    name={"password"}
                                    value={this.state.password}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.password}
                                    placeholder={"Password"}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginNewUser: Proptypes.func.isRequired,
    authRed: Proptypes.object.isRequired,
    errorsRed: Proptypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        authRed: state.authReducer,
        errorsRed: state.errorsReduder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginNewUser: (userData, history) => dispatch(loginUser(userData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);