import React from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';

const InputWithIcon = (props) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={props.icon} />
                </span>
            </div>
            <input
                type='text'
                name={props.name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': props.error
                })}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.delegateFunc}
            />
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    )
}
InputWithIcon.prototype = {
    type: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
    value: Proptypes.string.isRequired,
    delegateFunc: Proptypes.func.isRequired,
    error: Proptypes.object,
    placeholder: Proptypes.string.isRequired,
    icon: Proptypes.string
}
InputWithIcon.defaultProps = {
    type: 'text'
}
export default InputWithIcon;