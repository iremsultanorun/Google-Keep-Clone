import React from 'react'
import "./../css/Header.css"

import { useDispatch, useSelector } from 'react-redux'


import Pin from '../../../common/Actions/Action-buttons/Pin'
import BgPaletteButton from '../../../common/Actions/Action-buttons/BgPaletteButton'
import OthersButton from '../../../common/Actions/Action-buttons/OptionsButton'

import { CgClose } from 'react-icons/cg'
import { BiBellPlus } from 'react-icons/bi'
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri'
import { useLocation } from 'react-router-dom'
import { MdDeleteForever, MdRestoreFromTrash } from 'react-icons/md'
import { moveSelectedTodosToArchive, resetTodoSelection, restoreSelectedTodosFromArchive, restoreSelectedTodosFromTrash } from '../../../redux/todosSlice'

function SelectionBar() {

    const dispatch = useDispatch()
    const location = useLocation()
    const selectedCurrent = useSelector((state) => state.todo.selectedCurrent)

    const statusArchive = location.pathname === "/archive"
    const statusTrash = location.pathname === "/trash"

    const isSelected = selectedCurrent > 0

    const selectionBarAnimation = () => {
        dispatch(resetTodoSelection())
    }

    return (
        <div>
            <div
                className="selection-bar"
                style={{ transform: isSelected ? "translateY(0px)" : "translateY(-300px)" }}
            >

                <div className='selection-bar__count-group'>
                    <button
                        className='btn md-btn'
                        onClick={selectionBarAnimation}>
                        <CgClose />
                    </button>
                    <h3 className='selection-bar__count'>{selectedCurrent} of them was selected</h3>
                </div>

                {
                    statusTrash
                        ? <div className="selection-bar__actions-wrapper">
                            <button className='btn md-btn selection-bar__action' data-tooltip-text="Completely delete">
                                <MdDeleteForever />
                            </button>

                            <button
                                className='btn md-btn selection-bar__action'
                                data-tooltip-text="Restore"
                                onClick={() => dispatch(restoreSelectedTodosFromTrash())}
                            >
                                <MdRestoreFromTrash />
                            </button>
                        </div>

                        : <div className='selection-bar__actions-wrapper'>

                            <Pin todoId={null} status={"selected"} />
                            <BgPaletteButton todoId={null} status={"selected"} />
                            <button className='btn md-btn selection-bar__action disabled'>
                                <BiBellPlus />
                            </button>
                            {
                                statusArchive ?
                                    <button
                                        className='btn md-btn selection-bar__action'
                                        onClick={() => {
                                            dispatch(moveSelectedTodosToArchive())
                                        }}
                                    >
                                        <RiInboxUnarchiveLine />
                                    </button>
                                    : <button
                                        className='btn md-btn selection-bar__action'
                                        onClick={() => {
                                            dispatch(restoreSelectedTodosFromArchive())
                                        }}
                                    >
                                        <RiInboxArchiveLine />
                                    </button>
                            }

                            <OthersButton todoId={null} status={"selected"} />
                        </div>
                }
            </div>
        </div>
    )
}

export default SelectionBar