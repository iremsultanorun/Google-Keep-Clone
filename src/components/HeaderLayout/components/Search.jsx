import React from 'react'
import "../css/Search.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setIsSearchPage } from '../../../redux/headerSlice'

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";

function Search() {

  const isSearchModal = useSelector((state) => state.header.isSearchModal)
  const isSearchPage = useSelector((state) => state.header.isSearchPage)
const backgroundColor=isSearchPage ? "white" : "var(--color-gray-100)"
const boxShadow=isSearchPage
? "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
: "none"
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputClick = () => {
    dispatch(setIsSearchPage(true))
    navigate("/search")
  }
  const handleCloseClick = () => {
    dispatch(setIsSearchPage(false))
    navigate("/")
  }

  return (
    <div className='search'
      data-open-modal={isSearchModal}
      style={{
        backgroundColor: backgroundColor,
        boxShadow: boxShadow,
      }}
    >
      <button
        className='btn md-btn search__icon' data-tooltip-text="Search">
        <HiOutlineMagnifyingGlass />
      </button>

      <input
        type="text"
        className='search__input'
        placeholder='Search'
        onClick={handleInputClick} />

      <button
        className='btn md-btn search__close-btn' data-tooltip-text="Clear Search"
        onClick={handleCloseClick}>
        {
          isSearchPage ? <CgClose /> : null
        }
      </button>
    </div>
  )
}

export default Search