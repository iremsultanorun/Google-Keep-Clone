import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo'
import "../css/TodoList.css"


function TodoList() {

  const todos = useSelector((state) => state.todo.todos)

  return (
    <div className='todoList__container'>

      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList