import React from 'react'
import TodoList from '../components/TodoLayout/component/TodoList'
import { useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'
import EmptyStateArchive from "./../assets/empty-state-icons/empty-state-archive-icon.svg"
function Archive() {
  const archiveNotes = useSelector((state) => state.todo.archiveNotes)
  return (
    <div style={{marginTop:"20px"}}>
      <TodoList notes={archiveNotes} status={"archive"} />
      {
        archiveNotes.length===0 && <EmptyState icon={EmptyStateArchive} message={"Your archived notes appear here"}/>
    }
    </div>
  )
}

export default Archive