import React from 'react'
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'
import EmptyStateReminders from '../assets/empty-state-icons/empty-state-reminders-icon.svg'
import { useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'

function Reminders() {
  const remindersNotes=useSelector((state)=>state.todo.remindersNotes)
  return (
    <div>
    <div>
    <CreateTodo/>
    <TodoList notes={remindersNotes} status={"reminders"} />
    {
        remindersNotes.length===0 && <EmptyState icon={EmptyStateReminders} message={"Notes with upcoming reminders appear here (This part is currently non-functional)"}/>
    }
        </div>
    </div>
  )
}

export default Reminders