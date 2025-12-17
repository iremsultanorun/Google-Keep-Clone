import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOthersModal } from '../../../redux/todosSlice'

import DropdownModal from '../../../modals/DropdownModal'

import { LuEllipsisVertical } from 'react-icons/lu'
import { setLabelModal } from '../../../redux/labelModalSlice'

function OthersButton({ todoId, status }) {

    const dispatch = useDispatch()
    const openModalTodoId = useSelector((state) => state.todo.openModalTodoId)
    const isOthersModal = useSelector((state) => state.todo.isOthersModal)
const openModal=openModalTodoId===todoId
    let className = "btn "

    switch (status) {
        case "selected":
            className += "md-btn selection-bar__action"
            break;
        default:
            className += "action-btn sm-btn"
            break;
    }

    return (
        <div>
            <button
                onClick={() => {
                
                    dispatch(setIsOthersModal({id:todoId,status:status})), 
                    dispatch(setLabelModal(false))}}
                className={className}
                data-tooltip-text="Other">
                <LuEllipsisVertical />
            </button>

            {
                status==="create"||status==="selected"?
                isOthersModal && <DropdownModal todoId={null} status={status} />:
                openModal && <DropdownModal todoId={todoId} status={status} />
            }

        </div>
    )
}

export default OthersButton

