import React, { useRef } from 'react'
import Header from './component/Header'
import "./HeaderLayout.css"
import Search from './component/Search'
import HeaderControls from './component/HeaderControls'
import { useSelector } from 'react-redux'
import Pin from '../oparations/Pin'
function HeaderLayout() {
  const selectedCurrent = useSelector((state) => state.todo.selectedCurrent)
  const isSelected = selectedCurrent > 0
  const headerSelectedRef = useRef()
  const animasyon = () => {
    headerSelectedRef.current.style.transform = "translateY(-65px)"

  }
  return (
    <div>
      <div className='header-layout'>
        <Header />
        <Search />
        <HeaderControls />
      </div>
      <div ref={headerSelectedRef} className="header-layout__selected"
        style={{ transform: isSelected && "translateY(0px)" }}
      >
        <div className='selected-num-wrapper'>
          <button className='btn md-btn' onClick={animasyon}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h3 className='selected-num'>{selectedCurrent} tanesi seçildi</h3>
        </div>
        <div className='header-layout__selected-todo-oparations'>
          <Pin className="btn md-btn header-layout__selected-pin" />
          <button className='btn md-btn'><i className="fa-solid fa-palette"></i></button>
          <button className='btn md-btn'><i className="fa-regular fa-bell"></i></button>
          <button className='btn md-btn'><i className="fa-solid fa-box-archive"></i></button>
          <button className='btn md-btn'><i className="fa-solid fa-ellipsis-vertical"></i></button>
        </div>
      </div>
    </div>

  )
}

export default HeaderLayout