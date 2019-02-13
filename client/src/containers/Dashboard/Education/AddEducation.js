import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from '../../../components/UI/Input/TextInput';
import TextArea from '../../../components/UI/Input/TextArea';
import { addEducation } from '../../../store/actions/profile.action';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldOfStudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
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

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldOfStudy: this.state.fieldOfStudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addNewEducation(eduData, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">
                                Add any school, bootcamp, etc that you have attended
                            </p>
                            <small className="d-block pb-3">* required fields</small>
                            <form onSubmit={this.onSubmitHandler}>
                                <TextInput
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.school}
                                />
                                <TextInput
                                    placeholder="* Degree or Certification"
                                    name="degree"
                                    value={this.state.degree}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.degree}
                                />
                                <TextInput
                                    placeholder="* Field of Study"
                                    name="fieldOfStudy"
                                    value={this.state.fieldOfStudy}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.fieldOfStudy}
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
                                        Current School
                                    </label>
                                </div>
                                <TextArea
                                    placeholder="Program Description"
                                    name="description"
                                    value={this.state.description}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.description}
                                    info="Tell us about the program that you were in"
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

AddEducation.propTypes = {
    addNewEducation: PropTypes.func.isRequired,
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
        addNewEducation: (eduData, history) => dispatch(addEducation(eduData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));
