import React from 'react'

function BackdropModal({ message, buttonText, onConfirm, onCancel }) {

    return (
        <div className='backdrop'>
            <div className='modal-content'>
                <p> {message} </p>
                <button onClick={onCancel} className='cancel-button'>
                    İptal
                </button>
                <button onClick={onConfirm} className='confirm-button'>
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default BackdropModal