import React from 'react'
import "./EmptyState.css"

function EmptyState({ icon, message }) {
  return (
    <div className='empty-state'>
      <img className='empty-state__icon' src={icon} alt="" />
      <h3 className='empty-state__message'> {message} </h3>
    </div>
  )
}

export default EmptyState