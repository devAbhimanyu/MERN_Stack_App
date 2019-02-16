import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../../store/actions/profile.action';
import ModalScreen from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Education extends Component {
    onDeleteClick = (eduId) => {
        this.props.deleteUserEducation(eduId);
    }

    render() {
        const progressScreen = <ModalScreen show={true}><Spinner message='Delete in progress' /></ModalScreen>;
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                </td>
                <td>
                    <button
                        onClick={() => this.onDeleteClick(edu._id)}
                        className="btn btn-danger" > Delete </button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th />
                        </tr>
                        {this.props.inProgress ? progressScreen : education}
                    </thead>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteUserEducation: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => {
    return {
        deleteUserEducation: () => dispatch(deleteEducation())
    }
}

export default connect(null, mapDispatchToProps)(Education);