import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo'
import "../css/TodoList.css"


function TodoList() {

  const todos = useSelector((state) => state.todo.todos)
  const pinnedTodos = todos.filter((todo) => todo.pinned == true)
  const othersTodos = todos.filter((todo) => todo.pinned == false)

  return (
    <div className='todoList__container'>
    {pinnedTodos.length>0&&
        <div className="pinned">
        <h5>pinned</h5>
        {
          pinnedTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))
        }
      </div>
    }
    {
      othersTodos.length>0&&
      <div className="others">
   {
    todos.map((todo)=>(
     todo.pinned&& <h5>others</h5>
    ))
   }
      {
        othersTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))
      }
    </div>
    }
    

    </div>
  )
}

export default TodoList