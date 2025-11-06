import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOthersModal } from '../../redux/todosSlice'
import OthersModal from '../../modals/OthersModal'

function Others({todoId}) {
    const dispatch=useDispatch()
    const isOthersModal = useSelector((state) => state.todo.isOthersModal)
    return (
        <div>
            <button onClick={()=>dispatch(setIsOthersModal())} className='btn action-btn sm-btn' data-tooltip-text="Other">
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            
   {
    isOthersModal ?<OthersModal todoId={todoId} />:null
   }
    
        </div>
    )
}

export default Others