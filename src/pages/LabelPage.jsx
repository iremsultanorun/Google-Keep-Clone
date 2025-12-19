import React from 'react'
import { useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'
import EmptyStateLabel from "./../assets/empty-state-icons/empty-state-label-icon.svg"
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'
import { useParams } from 'react-router-dom'

function LabelPage() {
  const { labelName } = useParams()
  const archiveNotes = useSelector((state) => state.todo.archiveNotes)
  const todos = useSelector((state) => state.todo.todos)
  
  const homeLabelTodos = todos.filter(todo =>
    todo.labels.includes(labelName)
  )
  
  const archiveLabelTodos = archiveNotes.filter(todo =>
    todo.labels?.includes(labelName)
  )
console.log(labelName)
  return (
    <div>
      <div>
        <CreateTodo status="labelPage" labelName={labelName} />
        {homeLabelTodos.length > 0 && (
          <TodoList notes={homeLabelTodos} status={"home"} />
        )}
        
        {archiveLabelTodos.length > 0 && (
      <div>
           <h3 className='todoList__title'>archived</h3>
           <TodoList notes={archiveLabelTodos} status={"archive"} />
      </div>
        )}
      </div>
      
      {
        homeLabelTodos.length === 0 && archiveLabelTodos.length === 0 && (
          <EmptyState 
            icon={EmptyStateLabel} 
            message={"No notes with this label yet"} 
          />
        )
      }
    </div>
  )
}

export default LabelPage