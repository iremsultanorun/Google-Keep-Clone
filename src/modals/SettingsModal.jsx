import React from 'react'
import UserOptionsModal from './UserOptionsModal'
import { useSelector } from 'react-redux'

function SettingsModal() {
  const settingsDropdownText=["Settings","Enable dark theme","Send feedback","Help","Application downloads","Keyboard shortcuts"]
  const isSettingsModal = useSelector((state) => state.header.isSettingsModal)

  return (
    <div className='settings__dropdown-menu '>
      {
        isSettingsModal &&   <UserOptionsModal items={settingsDropdownText} />
      }
          
    </div>
  )
}

export default SettingsModal