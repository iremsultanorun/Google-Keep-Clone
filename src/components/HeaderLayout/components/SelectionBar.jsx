import React from 'react'
import "./../css/Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedTodos, setAllArchiveTodo } from '../../../redux/todosSlice'

import Pin from '../../../common/Actions/Action-buttons/Pin'
import BgPaletteButton from '../../../common/Actions/Action-buttons/BgPaletteButton'
import OthersButton from '../../../common/Actions/Action-buttons/OthersButton'
import { CgClose } from 'react-icons/cg'
import { BiBellPlus } from 'react-icons/bi'
import { RiInboxArchiveLine } from 'react-icons/ri'

function SelectionBar() {
    const dispatch = useDispatch()
    const selectedCurrent = useSelector((state) => state.todo.selectedCurrent)

    const isSelected = selectedCurrent > 0

    const selectionBarAnimation = () => {
        dispatch(clearSelectedTodos())
    }
    return (
        <div>
            <div
                className="selection-bar"
                style={{ transform: isSelected ? "translateY(0px)" : "translateY(-300px)" }}
            >

                <div className='selection-bar__count-group'>
                    <button className='btn md-btn' onClick={selectionBarAnimation}>
                        <CgClose />
                    </button>
                    <h3 className='selection-bar__count'>{selectedCurrent} of them was selected</h3>
                </div>

                <div className='selection-bar__actions-wrapper'>
                    <Pin todoId={null} status={"selected"} />

                    <BgPaletteButton todoId={null} status={"selected"} />

                    <button className='btn md-btn selection-bar__action disabled'>
                        <BiBellPlus />
                    </button>

                    <button 
                    className='btn md-btn selection-bar__action'
                    onClick={()=>
                {
                    dispatch(setAllArchiveTodo())
                    console.log("çalıştı")
                }
                        
                     }
                    >
                        <RiInboxArchiveLine />
                    </button>

                    <OthersButton todoId={null} status={"selected"} />
                </div>
            </div>
        </div>
    )
}

export default SelectionBar