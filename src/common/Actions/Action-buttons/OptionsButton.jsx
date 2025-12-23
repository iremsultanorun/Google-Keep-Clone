import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openTodoOptions } from '../../../redux/todosSlice'

import DropdownModal from '../../../modals/DropdownModal'

import { LuEllipsisVertical } from 'react-icons/lu'
import { setLabelModal } from '../../../redux/labelModalSlice'

function OptionsButton({ todoId, status }) {

    const dispatch = useDispatch()

    const optionsModal = useSelector((state) => state.todo.optionsModal)
    const activeOptionsTodoId = useSelector((state) => state.todo.activeOptionsTodoId)

    let isModalOpen = false
    let currentClassName = "btn "
    const statusList = ["create", "selected", "todoDetail"]

    if (optionsModal) {
        statusList.includes(status)
            ? isModalOpen = optionsModal.status === status
            : isModalOpen = optionsModal.status === status && activeOptionsTodoId === todoId
    }



    status === "selected"
        ? currentClassName += "md-btn selection-bar__action"
        : currentClassName += "action-btn sm-btn"

    const handleOpenOthersButton = () => {
        (status === "selected" || status === "create") ?
            dispatch(openTodoOptions(
                {
                    id: null,
                    status: status

                }
            ))
            : dispatch(openTodoOptions(
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
                onClick={handleOpenOthersButton}
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

export default OptionsButton

