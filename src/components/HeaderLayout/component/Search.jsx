import React from 'react'
import "../css/Search.css"
import { useSelector } from 'react-redux'
function Search() {
  const isSearchModal=useSelector((state)=>state.header.isSearchModal)

  console.log("search",isSearchModal);
  return (
<div className='search' data-open-modal={isSearchModal}>
      <button className='btn md-btn search__icon' data-tooltip-text="Search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <input type="text" className='search__input' placeholder='Search' />
      <button className='btn md-btn search__close-btn'>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  )
}

export default Search