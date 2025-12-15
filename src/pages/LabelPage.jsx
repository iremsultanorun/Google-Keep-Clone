import React from 'react'
import { useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'
import EmptyStateLabel from "./../assets/empty-state-icons/empty-state-label-icon.svg"
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'
import { useParams } from 'react-router-dom'
function LabelPage() {
  const { labelName } = useParams()


  const todoList = useSelector(state => state.todo.todos)

  const labelTodos = todoList.filter(todo =>
    todo.labels.includes(labelName)
  )


  return (
    <div>
      <div>
        <CreateTodo />
        <TodoList notes={labelTodos} status={"home"} />
      </div>
      {
        labelTodos.length === 0 && <EmptyState icon={EmptyStateLabel} message={"No notes with this label yet"} />
      }

    </div>
  )
}

export default LabelPage