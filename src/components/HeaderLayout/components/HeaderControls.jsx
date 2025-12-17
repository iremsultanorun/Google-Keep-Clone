import React from 'react'
import "../css/HeaderControls.css"
import { useDispatch, useSelector } from 'react-redux'

import { setTodoLayout } from '../../../redux/todosSlice'
import { setIsAppsModal, setIsSearchModal, setIsSettingsModal } from '../../../redux/headerSlice'

import GoogleAppsModal from '../../../modals/GoogleAppsModal'

import { RiSettings3Line } from "react-icons/ri";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { CgClose } from 'react-icons/cg'

import DropdownModal from '../../../modals/DropdownModal'
import { GoRows } from 'react-icons/go'

function HeaderControls() {

  const dispatch = useDispatch()

  const todoLayout = useSelector((state) => state.todo.todoLayout)
  const isSettingsModal = useSelector((state) => state.header.isSettingsModal)
  const isAppsModal = useSelector((state) => state.header.isAppsModal)
  const isSearchModal = useSelector((state) => state.header.isSearchModal)
  const isSearchPage = useSelector((state) => state.header.isSearchPage)


  return (
    <div className='headerControls'>
      <div className='headerControls__wrapper'>
        <button
          className='btn headerControls__search'
          data-tooltip-text={!isSearchModal ? "Search" : null}
          onClick={() => dispatch(setIsSearchModal())}>
          {
            isSearchModal
              ? <CgClose />
              : <HiOutlineMagnifyingGlass />
          }

        </button>

        <button
          data-tooltip-text="Refresh"
          className='btn md-btn headerControls__reflesh'>
          <IoMdRefresh />
        </button>

        {
          !isSearchPage
            ? <button
              className='btn md-btn headerControls__list-view'
              data-tooltip-text={todoLayout ? "List view" : "Grid view"}
              onClick={() => dispatch(setTodoLayout())}>
              {
                todoLayout ? <FaTableCellsLarge /> : <GoRows />
              }
            </button>
            : null
        }

        <button
          className='btn md-btn headerControls__settings'
          data-tooltip-text="Settings"
          onClick={() => dispatch(setIsSettingsModal())}>
          <RiSettings3Line />
        </button>

        {
          isSettingsModal
          && <DropdownModal todoId={null} status={"setting"} />
        }

      </div>

      <div className='headerControls__wrapper'>
        <button
          className='btn md-btn headerControls__apps'
          data-tooltip-text="Google apps"
          onClick={() => dispatch(setIsAppsModal())}>
          <TbGridDots />
        </button>

        {
          isAppsModal && <GoogleAppsModal />
        }

        <button
          className='btn md-btn headerControls__account'
          data-tooltip-text="Google account" >
          <p>i</p>
        </button>

      </div>
    </div >
  )
}

export default HeaderControls