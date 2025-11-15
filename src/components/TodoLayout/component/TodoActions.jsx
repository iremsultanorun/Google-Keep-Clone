import React from 'react'

import OthersButton from '../../oparations/OthersButton'
import { useDispatch } from 'react-redux'
import { setArchiveTodo } from '../../../redux/todosSlice'
import BgPaletteButton from '../../oparations/BgPaletteButton'

function TodoActions({ todoId, status, className }) {
    const dispatch = useDispatch()

    return (
        <div className={"actions "+className} key={todoId}>
            <button className='btn action-btn sm-btn disabled' data-tooltip-text="Formatting options">
                <i className="fa-solid fa-underline"></i>
            </button>
        <BgPaletteButton todoId={todoId} status={status} className={className} />
            <button className='btn action-btn sm-btn actionBtn-remind disabled' data-tooltip-text="Remind me">
                <i className="fa-regular fa-bell"></i>
            </button>
            <button className='btn action-btn sm-btn actionBtn-collaborator disabled' data-tooltip-text="Collaborator">
                <i className="fa-solid fa-user-plus"></i>
            </button>
            <button className='btn action-btn sm-btn disabled' data-tooltip-text="Add image">
                <i className="fa-regular fa-image"></i>
            </button>
            <button className='btn action-btn sm-btn' onClick={() => dispatch(setArchiveTodo(todoId))} data-tooltip-text="Archive">
                <i className="fa-solid fa-inbox"></i>
            </button>

            <OthersButton todoId={todoId} status={status} className={className}  />

            <button className='btn action-btn sm-btn disabled' disabled={true} data-tooltip-text="Undo">
                <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button className='btn action-btn sm-btn disabled' disabled={true} data-tooltip-text="Rebuild">
                <i className="fa-solid fa-rotate-right"></i>
            </button>
        </div>

    )
}

export default TodoActions