import React, { Component } from 'react';
import axios from 'axios';

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

        axios.post('api/users/test', newUser)
            .then(res => {
                console.log(res.data);
            })
        console.log(newUser);
        axios.post('/api/users/register', newUser)
            .then(res => {
                console.log(res.data);
            })
            .catch(res => {
                console.log(res.data)
            })
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" value={this.state.name} placeholder="Name" name="name" onChange={this.onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" value={this.state.email} placeholder="Email Address" name="email" onChange={this.onChangeHandler} />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" value={this.state.password} placeholder="Password" name="password" onChange={this.onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.onChangeHandler} name="confirmPassword" />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;