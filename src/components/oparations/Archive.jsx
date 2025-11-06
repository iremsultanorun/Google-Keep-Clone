import React from 'react'
import { useDispatch } from 'react-redux'
import { setArchiveTodo } from '../../redux/todosSlice'

function Archive({todoId}) {
    const dispatch=useDispatch()
  return (
    <div>
          <button onClick={()=>dispatch(setArchiveTodo(todoId))} className='btn action-btn sm-btn' data-tooltip-text="Archive">
            <i className="fa-solid fa-inbox"></i>
          </button>
    </div>
  )
}

export default Archive