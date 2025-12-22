import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPinnedTodo, setNewPinnedTodo, setPinnedTodo } from '../../../redux/todosSlice'
import { TbPinned, TbPinnedFilled } from 'react-icons/tb'

function Pin({ todoId, status }) {

    const dispatch = useDispatch()

    const todos = useSelector((state) => state.todo.todos);
    const archiveNotes = useSelector((state) => state.todo.archiveNotes);
    const isNewTodoPinned = useSelector((state) => state.todo.isPinned);
    let isPinnedStatus = false;

    const todoList = status === 'home' ? todos :
        status === 'archive' ? archiveNotes : null

    const currentTodo = todoList?.find(todo => todo.id === todoId);


    (status === "create")
        ? isPinnedStatus = isNewTodoPinned
        : currentTodo
            ? isPinnedStatus = currentTodo.pinned : null


    const handleClickPinnedButton = () => {
        if (status === "create") {
            dispatch(setNewPinnedTodo(!isNewTodoPinned));
        } else if (status === "selected") {
            dispatch(setAllPinnedTodo({ status: status }));
        } else {
            dispatch(setPinnedTodo({ pinnedId: todoId, status: status }));
        }
    }

    let currentClassName = "btn ";

    (status === "selected")
        ? currentClassName += " md-btn selection-bar__action"
        : currentClassName += " sm-btn fixed-btn"


    return (
        <div>
            <button
                key={todoId}
                className={currentClassName}
                data-tooltip-text="Pin note"
                onClick={handleClickPinnedButton}>

                {
                    isPinnedStatus
                        ? <TbPinnedFilled />
                        : <TbPinned />
                }

            </button>
        </div>
    )
}

export default Pin