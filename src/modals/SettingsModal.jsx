import React from 'react'
import './css/SettingsModal.css'

function SettingsModal() {
  return (
    <div className='settings__dropdown-menu'>
        <div className='settings__dropdown-item'><p className='settings__dropdown-text'>Settings</p></div>
        <div className='settings__dropdown-item'><p className='settings__dropdown-text'>Enable dark theme</p></div>
        <div className='settings__dropdown-item'><p className='settings__dropdown-text'>Send feedback</p></div>
        <div className='settings__dropdown-item'><p className='settings__dropdown-text'>Help</p></div>
        <div className='settings__dropdown-item'><p className='settings__dropdown-text'>Application downloads</p></div>
        <div className='settings__dropdown-item'><p className='settings__dropdown-text'>Keyboard shortcuts</p></div>
    </div>
  )
}

export default SettingsModal