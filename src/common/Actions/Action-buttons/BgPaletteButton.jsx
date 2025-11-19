import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsBgPaletteModal } from '../../../redux/todosSlice'
import TodoBgModal from '../../../modals/TodoBgModal'
import { MdOutlinePalette } from 'react-icons/md'

function BgPaletteButton({ todoId, status }) {
    const dispatch = useDispatch()
    const isPaletteModal = useSelector((state) => state.todo.isBgPaletteModal)

    let currentClassName = "btn "

    if (status === "selected") {
        currentClassName += "md-btn selection-bar__action"
    } else {
        currentClassName += "action-btn sm-btn"
    }


    return (
        <div>
            <button
                onClick={() => dispatch(setIsBgPaletteModal())}
                className={currentClassName}
                data-tooltip-text="Background options">
                <MdOutlinePalette />
            </button>

            {
                isPaletteModal &&
                <TodoBgModal todoId={todoId} status={status} />
            }

        </div>
    )
}

export default BgPaletteButton