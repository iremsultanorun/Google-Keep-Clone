import React from 'react'
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'
import { useSelector } from 'react-redux'

function Reminders() {
  const remindersNotes=useSelector((state)=>state.todo.remindersNotes)
  return (
    <div>
    <div>
    <CreateTodo/>
    <TodoList notes={remindersNotes} status={"reminders"} />
        </div>
    </div>
  )
}

export default Reminders