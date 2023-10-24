import React from 'react'

const ModalPopupComponent = (props) => { 
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon material-symbols-outlined" onClick={props.handleClose}>close</span>
                {props.content}
            </div>
        </div>
    )
}

export default ModalPopupComponent