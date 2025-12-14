import React from 'react'
import { useSelector } from 'react-redux'
import EmptyState from '../common/components/EmptyState'
import EmptyStateLabel from "./../assets/empty-state-icons/empty-state-label-icon.svg"
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'
function LabelPage() {
  const labelList=useSelector(state=>state.labelModal.labelList)
  console.log(labelList)
  return (
    <div>
         <div>
    <CreateTodo/>
    <TodoList notes={labelList} status={"labelPage"} />
        </div>
    {
        labelList.length!==0 && <EmptyState icon={EmptyStateLabel} message={"No notes with this label yet"}/>
    }

    </div>
  )
}

export default LabelPage