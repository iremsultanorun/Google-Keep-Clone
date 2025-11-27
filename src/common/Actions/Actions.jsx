import React from 'react'

import { useDispatch } from 'react-redux'
import { setAllArchiveTodo, setArchiveTodo, setNewArchiveTodo, setRestoreArchive, setRestoreTrash } from '../../redux/todosSlice'

import OthersButton from './Action-buttons/OthersButton'
import BgPaletteButton from './Action-buttons/BgPaletteButton'

import { RiArrowGoBackLine, RiArrowGoForwardLine, RiInboxArchiveLine, RiInboxUnarchiveLine } from "react-icons/ri";
import { BiBellPlus } from 'react-icons/bi'
import { PiTextAUnderline } from 'react-icons/pi'
import { FiUserPlus } from 'react-icons/fi'
import { MdDeleteForever, MdOutlineImage, MdRestoreFromTrash } from 'react-icons/md'

function Actions({ todoId, status, className }) {

    const dispatch = useDispatch()

    const isEditingOrNote = status === "create" || status === "note";
    const isActiveTodo = isEditingOrNote || status === "home" || status === "archive";

    return (

        <div className={"actions " + className} key={todoId}>

            {
                status === "trash" ?
                    <button className='btn action-btn sm-btn' data-tooltip-text="Completely delete">
                        <MdDeleteForever />
                    </button> : null
            }
            {
                status === "trash" ?
                    <button
                     className='btn action-btn sm-btn' 
                     data-tooltip-text="Restore"
                     onClick={()=>dispatch(setRestoreTrash(todoId))}
                     >
                        <MdRestoreFromTrash />
                    </button> : null
            }
            {
                isEditingOrNote ?
                    <button className='btn action-btn sm-btn disabled' data-tooltip-text="Formatting options">
                        <PiTextAUnderline />
                    </button> : null
            }
            {
                isActiveTodo ?
                    <BgPaletteButton todoId={todoId} status={status} className={className} /> : null
            }
            {
                isActiveTodo ?
                    <button className='btn action-btn sm-btn actionBtn-remind disabled' data-tooltip-text="Remind me">
                        <BiBellPlus />
                    </button> : null
            }
            {
                isActiveTodo ?
                    <button className='btn action-btn sm-btn actionBtn-collaborator disabled' data-tooltip-text="Collaborator">
                        <FiUserPlus />
                    </button> : null
            }
            {
                isActiveTodo ?
                    <button className='btn action-btn sm-btn disabled' data-tooltip-text="Add image">
                        <MdOutlineImage />
                    </button> : null
            }
            {
                isEditingOrNote || status === "home" ?
                    <button className='btn action-btn sm-btn' onClick={() => 
                        {
                        dispatch(setArchiveTodo(todoId))
                     if(status==="create"){
                        dispatch(setNewArchiveTodo())
                     }
                    }} data-tooltip-text="Archive">
                        <RiInboxArchiveLine />
                    </button> : null
            }
            {
                status === "archive" ?
                    <button
                        className='btn action-btn sm-btn'
                        data-tooltip-text="Unarchive"
                        onClick={()=>{
                          dispatch(setRestoreArchive(todoId))
                            console.log("first")

                        }}
                    >
                        <RiInboxUnarchiveLine />
                    </button>
                    : null
            }
            {
                isActiveTodo ?
                    <OthersButton todoId={todoId} status={status} className={className} /> : null
            }
            {
                isEditingOrNote ?
                    <button className='btn action-btn sm-btn disabled' disabled={true} data-tooltip-text="Undo">
                        <RiArrowGoBackLine />
                    </button>
                    : null
            }

            {
                isEditingOrNote ?
                    <button className='btn action-btn sm-btn disabled' disabled={true} data-tooltip-text="Rebuild">
                        <RiArrowGoForwardLine />
                    </button> : null
            }


        </div>

    )
}

export default Actions