import React from 'react'
import "./css/TrashPage.css"
import TodoList from '../components/TodoLayout/component/TodoList'
import { useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'
import EmptyStateTrash from "./../assets/empty-state-icons/empty-state-trash-icon.svg"
function TrashPage() {
  const trashNotes=useSelector((state)=>state.todo.trashNotes)
  return (
    <div>
        <div style={{display:"flex"
        }}>
      <p>Notes in trash are deleted after 7 days</p>
      {
       trashNotes.length>0 &&
    
        <button>Empty Trash</button>
      }
      </div>
<TodoList notes={trashNotes} status={"trash"} />
{
        trashNotes.length===0 && <EmptyState icon={EmptyStateTrash} message={"No notes in Recycle Bin"}/>
    }
    </div>
  )
}

export default TrashPage