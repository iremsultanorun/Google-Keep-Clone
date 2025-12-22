import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOthersModal } from '../../../redux/todosSlice'

import DropdownModal from '../../../modals/DropdownModal'

import { LuEllipsisVertical } from 'react-icons/lu'
import { setLabelModal } from '../../../redux/labelModalSlice'

function OthersButton({ todoId, status }) {

    const dispatch = useDispatch()

    const openModalTodoIdOther = useSelector((state) => state.todo.openModalTodoIdOther)
    const isOthersModal = useSelector((state) => state.todo.isOthersModal)

    let isModalOpen = false
    let currentClassName = "btn "
    const statusList = ["create", "selected", "note"]

    if (isOthersModal) {
        statusList.includes(status)
            ? isModalOpen = isOthersModal.status === status
            : isModalOpen = isOthersModal.status === status && openModalTodoIdOther === todoId
    }



    status === "selected"
        ? currentClassName += "md-btn selection-bar__action"
        : currentClassName += "action-btn sm-btn"

    const handleClick = () => {
        (status === "selected" || status === "create") ?
            dispatch(setIsOthersModal(
                {
                    id: null,
                    status: status

                }
            ))
            : dispatch(setIsOthersModal(
                {
                    id: todoId,
                    status: status
                }
            ))
        dispatch(setLabelModal(false))
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className={currentClassName}
                data-tooltip-text="Other">
                <LuEllipsisVertical />
            </button>

            {
                (status === "create" || status === "selected")
                    ? isModalOpen
                    && <DropdownModal todoId={null} status={status} />
                    : isModalOpen
                    && <DropdownModal todoId={todoId} status={status} />
            }
        </div>
    )
}

export default OthersButton

