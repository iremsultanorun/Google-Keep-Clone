import React from 'react'
import './css/Modals.css'
import { useDispatch } from 'react-redux'
import { setDeleteTodo } from '../redux/todosSlice'
function UserOptionsModal({ items,todoId }) {
    const dispatch = useDispatch()
    return (
        <div className='userOptions__dropdown-menu'>

            {
                items.map((item,id) => (
                    <button key={id} onClick={() => item == "Delete note" ? dispatch(setDeleteTodo(todoId)) : null} className='userOptions__dropdown-item'><p className='userOptions__dropdown-text'> {item} </p></button>
                ))
            }
        </div>
    )
}

export default UserOptionsModal