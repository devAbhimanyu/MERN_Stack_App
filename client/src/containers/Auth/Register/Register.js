import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../store/actions/auth.action';
import TextInput from '../../../components/UI/Input/TextInput';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.authRed.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errorsRed) {
            this.setState({ errors: nextProps.errorsRed });
        }
    }

    onChangeHandler = (eve) => {
        this.setState({ [eve.target.name]: eve.target.value });
    }

    onSubmitHandler = (eve) => {
        eve.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        this.props.registerNewUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;
        console.log(this.props.errorsRed)
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmitHandler}>
                                <TextInput
                                    name={"name"}
                                    value={this.state.name}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.name}
                                    placeholder={"Name"}
                                />
                                <TextInput
                                    type={"email"}
                                    name={"email"}
                                    value={this.state.email}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.email}
                                    placeholder={"Email Address"}
                                    info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                                />
                                <TextInput
                                    type={"password"}
                                    name={"password"}
                                    value={this.state.password}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.password}
                                    placeholder={"Password"}
                                />
                                <TextInput
                                    type={"password"}
                                    name={"confirmPassword"}
                                    value={this.state.confirmPassword}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.confirmPassword}
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

Register.propTypes = {
    registerNewUser: Proptypes.func.isRequired,
    authRed: Proptypes.object.isRequired,
    errorsRed: Proptypes.object
}

const mapStateToProps = state => {
    return {
        authRed: state.authReducer,
        errorsRed: state.errorsReduder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerNewUser: (userData, history) => dispatch(registerUser(userData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));