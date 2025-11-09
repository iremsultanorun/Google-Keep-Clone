import React from 'react'
import TodoList from '../components/TodoLayout/component/TodoList'
import { useSelector } from 'react-redux'

function Archive() {
  const archiveNotes = useSelector((state) => state.todo.archiveNotes)
  return (
    <div>
      <TodoList notes={archiveNotes} status={"archive"} />
    </div>
  )
}

export default Archive