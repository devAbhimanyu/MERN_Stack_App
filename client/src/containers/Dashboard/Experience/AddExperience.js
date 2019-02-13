import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from '../../../components/UI/Input/TextInput';
import TextArea from '../../../components/UI/Input/TextArea';
import { addExperience } from '../../../store/actions/profile.action';

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
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

    onCheckHandler = (eve) => {
        this.setState(prevState => {
            return {
                disabled: !prevState.disabled,
                current: !prevState.current
            }
        });
    }

    onSubmitHandler = (eve) => {
        eve.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addNewExperience(expData, this.props.history);
    }
    render() {
        const { errors } = this.state;

        return (
            <div className='add-experience'>
                <div className="container">
                    <div className="row">
                        <div className='col-md-8 m-auto'>
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">
                                Add any job or position that you have had in the past or current
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmitHandler}>
                                <TextInput
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.company}
                                />
                                <TextInput
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.title}
                                />
                                <TextInput
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.location}
                                />
                                <h6>From Date</h6>
                                <TextInput
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextInput
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheckHandler}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>
                                <TextArea
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.description}
                                    info="Tell us about your current position"
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    addNewExperience: PropTypes.func.isRequired,
    profileRed: PropTypes.object.isRequired,
    errorsRed: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        profileRed: state.profileReducer,
        errorsRed: state.errorsReduder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewExperience: (expData, history) => dispatch(addExperience(expData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));