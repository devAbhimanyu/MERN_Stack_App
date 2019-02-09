import React, { Component } from 'react'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
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
        console.log(userLogin);
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChangeHandler} />
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
export default Login;