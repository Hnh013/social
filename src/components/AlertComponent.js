import React from 'react'

const AlertComponent = (props) => {

    const theme = props.theme || 'notification';

    return (
        <div className='wrapper-basic-alert'>
            <div className={`basic-alert alert-${theme}`}>
                <span className="basic-alert-close material-symbols-outlined" onClick={props.handleClose}>cancel</span>
                {props.content}
            </div>
        </div>
    )
}

export default AlertComponent