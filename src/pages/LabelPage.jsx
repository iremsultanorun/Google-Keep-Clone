import React from 'react'
import { useSelector } from 'react-redux'

function LabelPage() {
  const labelList=useSelector(state=>state.labelModal.labelList)
  return (
    <div>
       {/* {
        labelList&& labelList.map((label,id)=>(

        ))
       } */}
         <div>
    <CreateTodo/>
    <TodoList notes={labelList} status={"labelPage"} />
        </div>
    </div>
  )
}

export default LabelPage