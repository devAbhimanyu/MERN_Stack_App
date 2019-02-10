import React from 'react';

const backDrop = (props) => (
    props.show ? <div className='CustomBackDrop'>
        {props.children}
    </div> : null
)

export default backDrop;