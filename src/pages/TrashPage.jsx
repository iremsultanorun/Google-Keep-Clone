import React from 'react'
import "./../css/TrashPage.css"
import TodoList from '../components/TodoLayout/component/TodoList'
import { useSelector } from 'react-redux'
function TrashPage() {
  const trashNotes=useSelector((state)=>state.todo.trashNotes)
  return (
    <div>
<TodoList notes={trashNotes} status={"trash"} />
    </div>
  )
}

export default TrashPage