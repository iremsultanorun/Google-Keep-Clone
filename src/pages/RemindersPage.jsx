import React from 'react'
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'
import EmptyStateReminders from '../assets/empty-state-icons/empty-state-reminders-icon.svg'
import { useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'

function Reminders() {
  const reminderTodos=useSelector((state)=>state.todo.reminderTodos)
  return (
    <div>
    <div>
    <CreateTodo/>
    <TodoList notes={reminderTodos} status={"reminders"} />
    {
        reminderTodos.length===0 && <EmptyState icon={EmptyStateReminders} message={"Notes with upcoming reminders appear here (This part is currently non-functional)"}/>
    }
        </div>
    </div>
  )
}

export default Reminders