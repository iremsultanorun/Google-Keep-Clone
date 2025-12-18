import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsBgPaletteModal } from '../../../redux/todosSlice'
import TodoBgModal from '../../../modals/TodoBgModal'
import { MdOutlinePalette } from 'react-icons/md'


function BgPaletteButton({ todoId, status }) {
    const dispatch = useDispatch()
    const isPaletteModal = useSelector((state) => state.todo.isBgPaletteModal)
    const openModalTodoId = useSelector((state) => state.todo.openModalTodoIdd)


    let isModalOpen = false;

    if (isPaletteModal) {
        if (status === "create") {
            isModalOpen = isPaletteModal.status === "create"
        } else if (status === "selected") {
            isModalOpen = isPaletteModal.status === "selected"

        } else if (status === "note") {
            isModalOpen = isPaletteModal.status === "note"
        } else {
            isModalOpen = isPaletteModal.status === status && openModalTodoId === todoId
        }
    }

    let currentClassName = "btn "

    if (status === "selected") {
        currentClassName += "md-btn selection-bar__action"
    } else {
        currentClassName += "action-btn sm-btn"
    }

    const handleClick = () => {
        if (status === "selected" || status === "create") {
            dispatch(setIsBgPaletteModal({ id: null, status: status }))
        } else {
            dispatch(setIsBgPaletteModal({ id: todoId, status: status }))
        }
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className={currentClassName}
                data-tooltip-text="Background options">
                <MdOutlinePalette />
            </button>

            {isModalOpen && <TodoBgModal todoId={todoId} status={status} />}
        </div>
    )
}
export default BgPaletteButton