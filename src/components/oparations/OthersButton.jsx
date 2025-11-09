import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOthersModal } from '../../redux/todosSlice'
import DropdownModal from '../../modals/DropdownModal'

function OthersButton({ todoId, status }) {
    const dispatch = useDispatch()
    const isOthersModal = useSelector((state) => state.todo.isOthersModal)
    return (
        <div>
            <button onClick={() => dispatch(setIsOthersModal())} className='btn action-btn sm-btn' data-tooltip-text="Other">
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {
                isOthersModal&&<DropdownModal todoId={todoId} status={status} />
            }
        </div>
    )
}

export default OthersButton

