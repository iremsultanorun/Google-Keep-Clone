import React from 'react'
import "../css/HeaderControls.css"
import { useDispatch, useSelector } from 'react-redux'
import { setTodoLayout } from '../../../redux/todosSlice'
import GoogleAppsModal from '../../../modals/GoogleAppsModal'

import { setIsAppsModal, setIsSearchModal, setIsSettingsModal } from '../../../redux/headerSlice'
import DropdownModal from '../../../modals/DropdownModal'
function HeaderControls() {
  const dispatch = useDispatch()
  const todoLayout = useSelector((state) => state.todo.todoLayout)
  const isSettingsModal=useSelector((state)=>state.header.isSettingsModal)
  const  isAppsModal=useSelector((state)=>state.header. isAppsModal)
  const isSearchModal=useSelector((state)=>state.header.isSearchModal)
 
  return (
    <div className='headerControls'>
      <div className='headerControls__wrapper'>
      <button className='btn md-btn search-btn' data-tooltip-text={isSearchModal?" ":"Search"} onClick={()=>dispatch(setIsSearchModal())}>
        {
          isSearchModal? <i className="fa-solid fa-xmark"></i>:<i className="fa-solid fa-magnifying-glass"></i>
        }
     
      </button>
        <button data-tooltip-text="Refresh" className='btn md-btn controlBtn__reflesh'>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <button className='btn md-btn controlBtn__list-view' data-tooltip-text="List view"  onClick={() => dispatch(setTodoLayout())}>
          {
            todoLayout ?<i className="fa-solid fa-table-cells-large"></i> : <i className="fa-solid fa-table-list"></i> 
          }


        </button>
        <button className='btn md-btn' data-tooltip-text="Settings" onClick={()=>dispatch(setIsSettingsModal())}>
          <i className="fa-solid fa-gear"></i>
        </button>
    {
      isSettingsModal&& <DropdownModal todoId={null} status={"setting"} />
    }
      </div>
      <div className='headerControls__wrapper'>
        <button className='btn md-btn controlBtn__apps' data-tooltip-text="Google apps" onClick={()=>dispatch(setIsAppsModal())}>
          <i className="fa-solid fa-grip"></i>
        </button>
       {
         isAppsModal?<GoogleAppsModal/>:null
       }
    
        <button className='btn md-btn account-btn' data-tooltip-text="Google account" >
          <p>i</p>
        </button>
       
        
      </div>
    </div>
  )
}

export default HeaderControls