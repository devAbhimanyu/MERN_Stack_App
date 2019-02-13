import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => (
    <React.Fragment>
        <div className='CustomSpinner'></div>
        <div className='m-auto' style={{ color: 'white', textAlign: 'center' }}>{props.message}</div>
    </React.Fragment>
)

export default spinner;