import React from 'react'
import './css/Modals.css'
import UserOptionsModal from './UserOptionsModal'
import { useSelector } from 'react-redux'

function OthersModal({todoId}) {
  const othersDropdownText=["Delete note","Enlşlşşlable dalşlşlşrk theme","Send felşlşedback","şl"," lşl","lş lş"]
  const isOthersModal = useSelector((state) => state.todo.isOthersModal)
  return (
    <div className='others__dropdown-menu'>
           {
            isOthersModal &&  <UserOptionsModal todoId={todoId} items={othersDropdownText} />

           }
    </div>
  )
}

export default OthersModal