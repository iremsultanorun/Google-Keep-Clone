import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo'
import "../css/TodoList.css"


function TodoList({ notes, status }) {

  const todos = notes

  const pinnedTodos = todos.filter((todo) => todo.pinned == true)
  const othersTodos = todos.filter((todo) => todo.pinned == false)
  const todoLayout = useSelector((state) => state.todo.todoLayout)


  return (
    <div className='todoList__container'>
      {
        status == "trash" ? null :
          pinnedTodos.length > 0 &&
          <div>
            <h5 className='todoList__title'>pinned</h5>
            <div className="pinned todoList__type" data-open-modal={todoLayout} >
              {
                pinnedTodos.map((todo) => (
                  <Todo key={todo.id} todo={todo} />
                ))
              }
            </div>
          </div>
      }
      {
        othersTodos.length > 0 &&
        <div>
          {
            pinnedTodos.length > 0 && <h5 className='todoList__title'>others</h5>
          }
          < div className="others todoList__type" data-open-modal={todoLayout} >
            {
              othersTodos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))
            }
          </div>
        </div>
      }
    </div >
  )
}

export default TodoList