import React, { Component } from 'react';
import './Modal.css';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
    }

    render() {
        return (
            <React.Fragment>
                <BackDrop show={this.props.show} bdClicked={this.props.closeModal} />
                <div className='CustomModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </React.Fragment>

        )
    }
}

export default Modal;