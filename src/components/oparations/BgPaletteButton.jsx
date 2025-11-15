import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllBgColor, setIsBgPaletteModal } from '../../redux/todosSlice'
import TodoBgModal from '../../modals/TodoBgModal'

function BgPaletteButton({ todoId, status}) {
    const dispatch = useDispatch()
    const isPaletteModal = useSelector((state) => state.todo.isBgPaletteModal)
   let currentClassName="btn "
    if(status==="selected"){
        currentClassName+="md-btn header-layout__selected-todo-oparations"
    }else{
        currentClassName+="action-btn sm-btn"
    }


    return (
        <div>
            <button onClick={()=> dispatch(setIsBgPaletteModal())} className={currentClassName} data-tooltip-text="Background options">
                <i className="fa-solid fa-palette"></i>
            </button>
            {
                isPaletteModal &&
                <TodoBgModal todoId={todoId} status={status}  />
            }
        </div>
    )
}

export default BgPaletteButton