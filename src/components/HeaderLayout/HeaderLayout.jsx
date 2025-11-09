import React from 'react'
import Header from './component/Header'
import "./HeaderLayout.css"
import Search from './component/Search'
import HeaderControls from './component/HeaderControls'
import {  useDispatch, useSelector } from 'react-redux'

import {clearSelectedTodos, setAllPinnedTodo } from '../../redux/todosSlice'
function HeaderLayout() {
  const selectedCurrent = useSelector((state) => state.todo.selectedCurrent)
  const isSelected = selectedCurrent > 0
  const dispatch=useDispatch()
  const animasyon = () => {
    
     dispatch(clearSelectedTodos())
  }
  return (
    <div>
      <div className='header-layout'>
        <Header />
        <Search />
        <HeaderControls />
      </div>
      <div  className="header-layout__selected"
        style={{ transform: isSelected ? "translateY(0px)": "translateY(-65px)" }}
      >
        <div className='selected-num-wrapper'>
        
   
            <button className='btn md-btn' onClick={animasyon}>
            <i className="fa-solid fa-xmark"></i>
          </button>
       
   
          <h3 className='selected-num'>{selectedCurrent} tanesi seçildi</h3>
        </div>
        <div className='header-layout__selected-todo-oparations'>

       
          <button className="btn md-btn header-layout__selected-pin" data-tooltip-text="Pin note" onClick={() => dispatch(setAllPinnedTodo())}>
                <i className="fa-solid fa-thumbtack"></i>
            </button>

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