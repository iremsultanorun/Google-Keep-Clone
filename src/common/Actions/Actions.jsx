import React from 'react'

import { useDispatch } from 'react-redux'
import { moveTodoToArchive, createArchivedTodo, restoreTodoFromArchive, restoreTodoFromTrash, deleteTodoFromTrash } from '../../redux/todosSlice'

import OthersButton from './Action-buttons/OptionsButton'
import BgPaletteButton from './Action-buttons/BgPaletteButton'

import { RiArrowGoBackLine, RiArrowGoForwardLine, RiInboxArchiveLine, RiInboxUnarchiveLine } from "react-icons/ri";
import { BiBellPlus } from 'react-icons/bi'
import { PiTextAUnderline } from 'react-icons/pi'
import { FiUserPlus } from 'react-icons/fi'
import { MdDeleteForever, MdOutlineImage, MdRestoreFromTrash } from 'react-icons/md'

function Actions({ todoId, status, className, istodoDetailComponent = false }) {

    const dispatch = useDispatch()

    const isCreate = status === "create"
    const isNote = istodoDetailComponent
    const isTodo = status === "todo"
    const isHome = status === "home"
    const isArchive = status === "archive"
    const isTrash = status === "trash"

    return (
        <div className={"actions " + className} key={todoId}>

            {
                isTrash &&
                <button 
                className='btn action-btn sm-btn' data-tooltip-text="Completely delete"
                onClick={()=>dispatch(deleteTodoFromTrash(todoId))}
                >
                    <MdDeleteForever />
                </button>
            }
            {
                isTrash &&
                <button
                    className='btn action-btn sm-btn'
                    data-tooltip-text="Restore"
                    onClick={() => dispatch(restoreTodoFromTrash({transferTodoId:todoId}))}
                >
                    <MdRestoreFromTrash />
                </button>
            }
            {
                isCreate || (isNote && !isTrash) ?
                    <button className='btn action-btn sm-btn disabled' data-tooltip-text="Formatting options">
                        <PiTextAUnderline />
                    </button> : null
            }
            {
                isCreate || (isNote && !isTrash) || isTodo || isHome || isArchive ?
                    <BgPaletteButton todoId={todoId} status={status} className={className} /> : null
            }
            {
                isCreate || (isNote && !isTrash) || isTodo || isHome || isArchive ?
                    <button className='btn action-btn sm-btn actionBtn-remind disabled' data-tooltip-text="Remind me">
                        <BiBellPlus />
                    </button> : null
            }
            {
                isCreate || (isNote && !isTrash) || isTodo || isHome || isArchive ?
                    <button className='btn action-btn sm-btn actionBtn-collaborator disabled' data-tooltip-text="Collaborator">
                        <FiUserPlus />
                    </button> : null
            }
            {
                isCreate || (isNote && !isTrash) || isTodo || isHome || isArchive ?
                    <button className='btn action-btn sm-btn disabled' data-tooltip-text="Add image">
                        <MdOutlineImage />
                    </button> : null
            }
            {

                (isNote && isHome) || isCreate || isTodo || (isHome && !isNote) ?
                    <button
                        className='btn action-btn sm-btn'
                        onClick={() => {
                            dispatch(moveTodoToArchive({transferTodoId:todoId}))
                            if (status === "create") {
                                dispatch(createArchivedTodo())
                            }
                        }}
                        data-tooltip-text="Archive"
                    >
                        <RiInboxArchiveLine />
                    </button>
                    : null
            }
            {

                (isNote && isArchive) || isTodo || (isArchive && !isNote) ?
                    <button
                        className='btn action-btn sm-btn'
                        data-tooltip-text="Unarchive"
                        onClick={() => {
                            dispatch(restoreTodoFromArchive({transferTodoId:todoId}))
                        }}
                    >
                        <RiInboxUnarchiveLine />
                    </button>
                    : null
            }
            {

                isCreate || (isNote && !isTrash) || isTodo || isHome || isArchive ?
                    <OthersButton todoId={todoId} status={status} className={className} />
                    : null
            }
            {

                isCreate || (isNote && !isTrash) ?
                    <button
                        className='btn action-btn sm-btn disabled'
                        disabled={true}
                        data-tooltip-text="Undo"
                    >
                        <RiArrowGoBackLine />
                    </button>
                    : null
            }
            {
                isCreate || (isNote && !isTrash) ?
                    <button
                        className='btn action-btn sm-btn disabled'
                        disabled={true}
                        data-tooltip-text="Redo"
                    >
                        <RiArrowGoForwardLine />
                    </button>
                    : null
            }
        </div>
    )
}

export default Actions