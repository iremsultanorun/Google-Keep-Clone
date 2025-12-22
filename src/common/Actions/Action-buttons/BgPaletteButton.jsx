import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsBgPaletteModal } from '../../../redux/todosSlice'

import TodoBgModal from '../../../modals/TodoBgModal'

import { MdOutlinePalette } from 'react-icons/md'

function BgPaletteButton({ todoId, status }) {

    const dispatch = useDispatch()

    const isPaletteModal = useSelector((state) => state.todo.isBgPaletteModal)
    const openModalTodoId = useSelector((state) => state.todo.openModalTodoIdPalette)

    let isModalOpen = false;
    let currentClassName = "btn "
    const statusList = ["create", "selected", "note"]

   if( isPaletteModal){
      statusList?.includes(status)
        ? isModalOpen = isPaletteModal.status === status
        : isModalOpen = isPaletteModal.status === status && openModalTodoId === todoId
   }


    status === "selected"
        ? currentClassName += "md-btn selection-bar__action"
        : currentClassName += "action-btn sm-btn"


    const handleClick = () => {
        (status === "selected" || status === "create")
            ? dispatch(setIsBgPaletteModal(
                {
                    id: null,
                    status: status
                }
            ))
            : dispatch(setIsBgPaletteModal(
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