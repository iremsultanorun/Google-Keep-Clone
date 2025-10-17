import React from 'react'
import "../css/HeaderControls.css"
function HeaderControls() {
  return (
    <div className='headerControls'>
      <div className='headerControls__wrapper'>
        <button style={{ fontSize: "18px" }} data-tooltip-text="Refresh" className='btn md-btn'>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <button className='btn md-btn' data-tooltip-text="List view">
          <i className="fa-solid fa-table-cells-large"></i>
          {/* <i class="fa-solid fa-table-list"></i> */}
        </button>
        <button className='btn md-btn' data-tooltip-text="Settings">
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>
      <div className='headerControls__wrapper'>
        <button className='btn md-btn' data-tooltip-text="Google apps">
          <i className="fa-solid fa-grip"></i>
        </button>
        <button className='btn md-btn account-btn' data-tooltip-text="Google account">
          <p>i</p>
        </button>
      </div>
    </div>
  )
}

export default HeaderControls