import React from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';

const SelectList = (props) => {
    const options = props.options.map(ele => {
        return <option key={ele.label} value={ele.value}>{ele.label}</option>
    })

    return (
        <div className="form-group">
            <select
                name={props.name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': props.error
                })}
                value={props.value}
                onChange={props.delegateFunc}>
                {options}
            </select>
            {props.info && <small className='form-text text-muted'>{props.info}</small>}
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    )
}
SelectList.prototype = {
    name: Proptypes.string.isRequired,
    value: Proptypes.string.isRequired,
    delegateFunc: Proptypes.func.isRequired,
    error: Proptypes.object,
    info: Proptypes.string,
    options: Proptypes.array.isRequired
}
export default SelectList;