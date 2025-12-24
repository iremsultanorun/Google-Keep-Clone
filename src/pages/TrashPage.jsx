import React from 'react'
import "./css/TrashPage.css"
import TodoList from '../components/TodoLayout/component/TodoList'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'
import EmptyStateTrash from "./../assets/empty-state-icons/empty-state-trash-icon.svg"
import { emptyTrash } from '../redux/todosSlice'
function TrashPage() {
  const dispatch = useDispatch()
  const trashTodos = useSelector((state) => state.todo.trashTodos)
  return (
    <div>
      <div className='trash__banner'>
        <p className='trash__banner-text'>Notes in the Recycle Bin are deleted after 7 days.</p>
        {
          trashTodos.length > 0 &&
          <button
            className='trash__btn'
            onClick={() => dispatch(emptyTrash())}
          >Empty Trash</button>
        }
      </div>
      <TodoList notes={trashTodos} status={"trash"} />
      {
        trashTodos.length === 0 && <EmptyState icon={EmptyStateTrash} message={"No notes in Recycle Bin"} />
      }
    </div>
  )
}

export default TrashPage