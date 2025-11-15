import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPinnedTodo, setNewPinnedTodo, setPinnedTodo } from '../../redux/todosSlice'

function Pin({todoId,status}) {
    const dispatch = useDispatch()
    const isPinned = useSelector((state) => state.todo.isPinned)
    let className="btn "
   const handleClickPinnedButton=()=>{
    if (status=="create") {
        dispatch(setNewPinnedTodo(true))
    }else if(status=="selected"){
     dispatch(setAllPinnedTodo())
    }
    else{
        dispatch(setPinnedTodo(todoId))
    }
   }
   if(status=="selected"){
    className+= " md-btn header-layout__selected-pin"
       }else{
   className+= (isPinned?"sm-btn black-fixed-btn":"sm-btn fixed-btn")
       }
    return (
        <div>
            <button key={todoId}  className= {className}data-tooltip-text="Pin note" onClick={handleClickPinnedButton}>
                <i className="fa-solid fa-thumbtack"></i>
            </button>
        </div>
    )
}

export default Pin