import React from 'react'
import "./css/TrashPage.css"
import TodoList from '../components/TodoLayout/component/TodoList'
import { useSelector } from 'react-redux'
function TrashPage() {
  const trashNotes=useSelector((state)=>state.todo.trashNotes)
  return (
    <div>
      {
       trashNotes.length>0 &&
      <div>
        <p>Notes in trash are deleted after 7 days</p>
        <button>Empty Trash</button>
      </div>
      }
<TodoList notes={trashNotes} status={"trash"} />
    </div>
  )
}

export default TrashPage