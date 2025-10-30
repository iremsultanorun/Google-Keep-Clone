import React from 'react'
import "../css/HeaderControls.css"
import { useDispatch, useSelector } from 'react-redux'
import { setTodoLayout } from '../../../redux/todosSlice'
import SettingModal from '../../../modals/SettingsModal'
import GoogleAppsModal from '../../../modals/GoogleAppsModal'
import GoogleAccountModal from '../../../modals/GoogleAccountModal'
import { setIsAccountModal, setIsAppsModal, setIsSettingsModal } from '../../../redux/headerSlice'
function HeaderControls() {
  const dispatch = useDispatch()
  const todoLayout = useSelector((state) => state.todo.todoLayout)
  const isSettingsModal=useSelector((state)=>state.header.isSettingsModal)
  const  isAppsModal=useSelector((state)=>state.header. isAppsModal)
  const  isAccountModal=useSelector((state)=>state.header. isAccountModal)
  return (
    <div className='headerControls'>
      <div className='headerControls__wrapper'>
        <button style={{ fontSize: "18px" }} data-tooltip-text="Refresh" className='btn md-btn'>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <button className='btn md-btn' data-tooltip-text="List view" onClick={() => dispatch(setTodoLayout())}>
          {
            todoLayout ?<i className="fa-solid fa-table-cells-large"></i> : <i class="fa-solid fa-table-list"></i> 
          }


        </button>
        <button className='btn md-btn' data-tooltip-text="Settings" onClick={()=>dispatch(setIsSettingsModal())}>
          <i className="fa-solid fa-gear"></i>
        </button>
    {
      isSettingsModal?<SettingModal/>:null
    }
      </div>
      <div className='headerControls__wrapper'>
        <button className='btn md-btn' data-tooltip-text="Google apps" onClick={()=>dispatch(setIsAppsModal())}>
          <i className="fa-solid fa-grip"></i>
        </button>
       {
         isAppsModal?<GoogleAppsModal/>:null
       }
    
        <button className='btn md-btn account-btn' data-tooltip-text="Google account" onClick={()=>dispatch(setIsAccountModal())}>
          <p>i</p>
        </button>
        {
         isAccountModal?<GoogleAccountModal/>:null
       }
        
      </div>
    </div>
  )
}

export default HeaderControls