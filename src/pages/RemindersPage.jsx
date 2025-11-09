import React from 'react'
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'

function Reminders() {
  return (
    <div>
    <div>
    <CreateTodo/>
    <TodoList notes={null} status={"reminders"} />
        </div>
    </div>
  )
}

export default Reminders