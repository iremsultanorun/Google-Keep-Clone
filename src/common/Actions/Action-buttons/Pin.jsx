import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPinnedTodo, setNewPinnedTodo, setPinnedTodo } from '../../../redux/todosSlice'
import { TbPinned, TbPinnedFilled } from 'react-icons/tb'

function Pin({ todoId, status }) {

    const dispatch = useDispatch()

    const isNewTodoPinned = useSelector((state) => state.todo.isPinned);

    const todos = useSelector((state) => state.todo.todos);
    const currentTodo = todos.find(todo => todo.id === todoId);

    let isPinnedStatus = false;

    if (status === "create") {
        isPinnedStatus = isNewTodoPinned;
    } else if (currentTodo) {
        isPinnedStatus = currentTodo.pinned;
    }

    const handleClickPinnedButton = () => {

        if (status === "create") {
            dispatch(setNewPinnedTodo(!isNewTodoPinned));
        } else if (status === "selected") {
            dispatch(setAllPinnedTodo());
        }
        else {
            dispatch(setPinnedTodo(todoId));
        }
    }

    let className = "btn ";
    if (status === "selected") {
        className += " md-btn selection-bar__action";
    } else {
        className += " sm-btn fixed-btn";
    }

    return (
        <div>
            <button
                key={todoId}
                className={className}
                data-tooltip-text="Pin note"
                onClick={handleClickPinnedButton}>

                {isPinnedStatus ? <TbPinnedFilled /> : <TbPinned />}
                
            </button>
        </div>
    )
}

export default Pin