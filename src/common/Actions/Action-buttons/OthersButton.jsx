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
    // const openModal=openModalTodoId===todoId
    let isModalOpen = false
    let className = "btn "
    if (isOthersModal) {
        if (status === "create") {
            isModalOpen = isOthersModal.status === "create"
        } else if (status === "selected") {
            isModalOpen = isOthersModal.status === "selected"
        } else if (status === "note") {
            isModalOpen = isOthersModal.status === "note"
        } else {
            isModalOpen = isOthersModal.status === status && openModalTodoId === todoId
        }
    }
    switch (status) {
        case "selected":
            className += "md-btn selection-bar__action"
            break;
        default:
            className += "action-btn sm-btn"
            break;
    }
    const handleClick = () => {
        if (status === "selected" || status === "create") {
            dispatch(setIsOthersModal({ id: null, status: status }))
        } else {
            dispatch(setIsOthersModal({ id: todoId, status: status }))
        }
        dispatch(setLabelModal(false))
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className={className}
                data-tooltip-text="Other">
                <LuEllipsisVertical />
            </button>

            {
                status === "create" || status === "selected" ?
                isModalOpen && <DropdownModal todoId={null} status={status} /> :
                    isModalOpen && <DropdownModal todoId={todoId} status={status} />
            }

        </div>
    )
}

export default OthersButton

