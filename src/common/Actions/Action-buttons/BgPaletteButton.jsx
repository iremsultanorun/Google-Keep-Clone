import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openBgPaletteModal } from '../../../redux/todosSlice'

import TodoBgModal from '../../../modals/TodoBgModal'

import { MdOutlinePalette } from 'react-icons/md'

function BgPaletteButton({ todoId, status }) {

    const dispatch = useDispatch()

    const bgPaletteModal = useSelector((state) => state.todo.isBgPaletteModal)
    const openModalTodoId = useSelector((state) => state.todo.openModalTodoIdPalette)

    let isModalOpen = false;
    let currentClassName = "btn "
    const statusList = ["create", "selected", "note"]

   if( bgPaletteModal){
      statusList?.includes(status)
        ? isModalOpen = bgPaletteModal.status === status
        : isModalOpen = bgPaletteModal.status === status && openModalTodoId === todoId
   }


    status === "selected"
        ? currentClassName += "md-btn selection-bar__action"
        : currentClassName += "action-btn sm-btn"


    const handleClick = () => {
        (status === "selected" || status === "create")
            ? dispatch(openBgPaletteModal(
                {
                    id: null,
                    status: status
                }
            ))
            : dispatch(openBgPaletteModal(
                {
                    id: todoId,
                    status: status
                }
            ))
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className={currentClassName}
                data-tooltip-text="Background options">
                <MdOutlinePalette />
            </button>

            {isModalOpen
                && <TodoBgModal todoId={todoId} status={status} />}
        </div>
    )
}
export default BgPaletteButton