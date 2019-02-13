import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../../store/actions/profile.action';
import ModalScreen from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Experience extends Component {
    onDeleteClickHandler = (id) => {
        this.props.deleteUserExperience(id);
    }

    render() {
        const progressScreen = <ModalScreen show={true}><Spinner message='Delete in progress' /></ModalScreen>;
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                </td>
                <td>
                    <button
                        onClick={() => this.onDeleteClickHandler(exp._id)}
                        className="btn btn-danger" >Delete</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th />
                        </tr>
                        {this.props.inProgress ? progressScreen : experience}
                    </thead>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    deleteUserExperience: PropTypes.func.isRequired,
    inProgress: PropTypes.bool
};

const mapDispatchToProps = dispatch => {
    return {
        deleteUserExperience: () => dispatch(deleteExperience())
    }
}

export default connect(null, mapDispatchToProps)(Experience);