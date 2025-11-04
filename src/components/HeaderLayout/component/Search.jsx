import React from 'react'
import "../css/Search.css"
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearchPage } from '../../../redux/headerSlice'
import { Link, useNavigate } from 'react-router-dom'
function Search() {
  const isSearchModal=useSelector((state)=>state.header.isSearchModal)
  const isSearchPage=useSelector((state)=>state.header.isSearchPage)
  const navigate=useNavigate()
  const dispatch=useDispatch()
const handleInputClick=()=>{
  dispatch(setIsSearchPage(true))
  navigate("/search")
}
const handleCloseClick=()=>{
  dispatch(setIsSearchPage(false))
  navigate("/")
}
  return (
<div className='search' data-open-modal={isSearchModal}>
      <button className='btn md-btn search__icon' data-tooltip-text="Search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <Link to="/search">
      <input type="text" className='search__input' placeholder='Search' onClick={handleInputClick} />
      </Link>
      <button className='btn md-btn search__close-btn' onClick={handleCloseClick}>
    {
      isSearchPage?<i className="fa-solid fa-xmark"></i>:null
    }
      </button>
    </div>
  )
}

export default Search