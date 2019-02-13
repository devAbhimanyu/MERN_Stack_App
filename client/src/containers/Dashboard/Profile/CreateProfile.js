import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from '../../../components/UI/Input/TextArea';
import SelectList from '../../../components/UI/Input/SelectList';
import InputWithIcon from '../../../components/UI/Input/InputWithIcon';
import TextInput from '../../../components/UI/Input/TextInput';
import { createProfile } from '../../../store/actions/profile.action'
class CreateProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubUserName: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errorsRed) {
            this.setState({ errors: nextProps.errorsRed })
        }
    }

    onChangeHandler = (eve) => {
        this.setState({ [eve.target.name]: eve.target.value });
    }

    onSubmitHandle = (e) => {
        e.preventDefault();

        const newProfileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubUserName: this.state.githubUserName,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        }

        this.props.createNewProfile(newProfileData, this.props.history)
    }

    toggleSocialInputStateHandler = () => {
        this.setState(prevState => {
            return { displaySocialInputs: !prevState.displaySocialInputs }
        })
    }

    render() {
        const { errors, displaySocialInputs } = this.state;
        let socialInputs = null;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputWithIcon
                        placeholder='Twitter Profile URL'
                        name='twitter'
                        icon='fab fa-twitter'
                        value={this.state.twitter}
                        delegateFunc={this.onChangeHandler}
                        error={errors.twitter}
                    />

                    <InputWithIcon
                        placeholder='Facebook Page URL'
                        name='facebook'
                        icon='fab fa-facebook'
                        value={this.state.facebook}
                        delegateFunc={this.onChangeHandler}
                        error={errors.facebook}
                    />

                    <InputWithIcon
                        placeholder='Linkedin Profile URL'
                        name='linkedin'
                        icon='fab fa-linkedin'
                        value={this.state.linkedin}
                        delegateFunc={this.onChangeHandler}
                        error={errors.linkedin}
                    />

                    <InputWithIcon
                        placeholder='YouTube Channel URL'
                        name='youtube'
                        icon='fab fa-youtube'
                        value={this.state.youtube}
                        delegateFunc={this.onChangeHandler}
                        error={errors.youtube}
                    />

                    <InputWithIcon
                        placeholder='Instagram Page URL'
                        name='instagram'
                        icon='fab fa-instagram'
                        value={this.state.instagram}
                        delegateFunc={this.onChangeHandler}
                        error={errors.instagram}
                    />
                </div>
            );
        }
        // Select options for status
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ]
        return (
            <div className='create-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Create Your Profile</h1>
                            <p className='lead text-center'>
                                Let's get some information, to bettter know you</p>
                            <small className='d-block pb-3'>* required fields</small>
                            <form onSubmit={this.onSubmitHandle}>
                                <TextInput
                                    name='handle'
                                    value={this.state.handle}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.handle}
                                    placeholder='* Profile Handle'
                                    info='A unique handle for your profile URL'
                                />
                                <SelectList
                                    name='status'
                                    value={this.state.status}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.status}
                                    info='Yout current role'
                                    options={options}
                                />
                                <TextInput
                                    name='company'
                                    value={this.state.company}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.company}
                                    placeholder='Company'
                                    info='Place of work'
                                />
                                <TextInput
                                    name='website'
                                    value={this.state.website}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.website}
                                    placeholder='Website'
                                    info='Could be your own website or a company one'
                                />
                                <TextInput
                                    name='location'
                                    value={this.state.location}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.location}
                                    placeholder='City or state'
                                    info='City or state suggested (eg. Delhi, Karnataka)'
                                />
                                <TextInput
                                    name='skills'
                                    value={this.state.skills}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.skills}
                                    placeholder='* Skills'
                                    info='Please use comma separated values (eg.HTML,CSS,JavaScript,PHP'
                                />
                                <TextInput
                                    name='githubUserName'
                                    value={this.state.githubUserName}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.githubUserName}
                                    placeholder='Github Username'
                                    info='If you want your latest repos and a Github link, include your username'
                                />
                                <TextArea
                                    placeholder='Short Bio'
                                    name='bio'
                                    value={this.state.bio}
                                    delegateFunc={this.onChangeHandler}
                                    error={errors.bio}
                                    info='Tell us a little about yourself'
                                />
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={this.toggleSocialInputStateHandler}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
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

CreateProfile.proptype = {
    profileRed: Proptypes.object.isRequired,
    errorsRed: Proptypes.object.isRequired,
    createNewProfile: Proptypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        profileRed: state.profileReducer,
        errorsRed: state.errorsReduder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewProfile: (profileData, history) => dispatch(createProfile(profileData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile));