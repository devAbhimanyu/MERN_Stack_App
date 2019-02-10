import React from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';

const TextArea = (props) => {
    return (
        <div className="form-group">
            <textarea
                type='text'
                name={props.name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': props.error
                })}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.delegateFunc}
            />
            {props.info && <small className='form-text text-muted'>{props.info}</small>}
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    )
}
TextArea.prototype = {
    name: Proptypes.string.isRequired,
    value: Proptypes.string.isRequired,
    delegateFunc: Proptypes.func.isRequired,
    error: Proptypes.object,
    placeholder: Proptypes.string.isRequired,
    info: Proptypes.string
}
export default TextArea;