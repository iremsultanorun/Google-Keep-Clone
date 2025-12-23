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

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearchOpen = () => {
    dispatch(setIsSearchPage(true))
    navigate("/search")
  }
  const handleSearchClose = () => {
    dispatch(setIsSearchPage(false))
    navigate("/")
  }

  return (
    <div className={`search ${isSearchPage ? "page-active" : " "}`}
      data-open-modal={isSearchModal}
    >
      <button
        className='btn md-btn search__icon' data-tooltip-text="Search">
        <HiOutlineMagnifyingGlass />
      </button>

      <input
        type="text"
        className='search__input'
        placeholder='Search'
        onClick={handleSearchOpen} />

      <button
        className='btn md-btn search__close-btn'
        data-tooltip-text="Clear Search"
        onClick={handleSearchClose}>
        {
          isSearchPage && <CgClose />
        }
      </button>
    </div>
  )
}

export default Search