import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pinSelectedTodos, toggleDraftPin, toggleTodoPin } from '../../../redux/todosSlice'
import { TbPinned, TbPinnedFilled } from 'react-icons/tb'

function Pin({ todoId, status }) {

    const dispatch = useDispatch()

    const todos = useSelector((state) => state.todo.todos);
    const archiveTodos = useSelector((state) => state.todo.archiveTodos);
    const isNewTodoPinned = useSelector((state) => state.todo.isPinned);
    let isPinnedStatus = false;

    const todoList = status === 'home' ? todos :
        status === 'archive' ? archiveTodos : null

    const currentTodo = todoList?.find(todo => todo.id === todoId);


    (status === "create")
        ? isPinnedStatus = isNewTodoPinned
        : currentTodo
            ? isPinnedStatus = currentTodo.pinned : null


    const handleClickPinnedButton = () => {
        if (status === "create") {
            dispatch(toggleDraftPin(!isNewTodoPinned));
        } else if (status === "selected") {
            dispatch(pinSelectedTodos({ status: status }));
        } else {
            dispatch(toggleTodoPin({ pinnedId: todoId, status: status }));
        }
    }

    let currentClassName = "btn ";

    (status === "selected")
        ? currentClassName += " md-btn selection-bar__action"
        : currentClassName += " fixed-btn"


    return (
        <div>
            <button
                key={todoId}
                className={currentClassName}
                data-tooltip-text="Pin todo"
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