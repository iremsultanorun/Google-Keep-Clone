import React from 'react'
import { useDispatch } from 'react-redux'
import { setPinnedTodo } from '../../redux/todosSlice'

function Pin({className,todoId}) {

    const dispatch=useDispatch()
    return (
        <div>
          
                    <button key={todoId} className={className} data-tooltip-text="Pin note" onClick={() => dispatch(setPinnedTodo(todoId))}>
                        <i className="fa-solid fa-thumbtack"></i>
                    </button>
                
        </div>
    )
}

export default Pin