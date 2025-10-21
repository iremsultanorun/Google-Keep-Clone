import React from 'react'
import { useSelector } from 'react-redux'
import { setPinnedTodo } from '../../redux/todosSlice'

function Pin() {
    const todos = useSelector((state) => state.todo.todos)
    return (
        <div>
            {
                todos.map((todo) => (
                    <button key={todo.id} className='fixed-btn btn sm-btn' data-tooltip-text="Pin note" onClick={() => setPinnedTodo(todo.id)}>
                        <i className="fa-solid fa-thumbtack"></i>
                    </button>
                ))
            }
        </div>
    )
}

export default Pin