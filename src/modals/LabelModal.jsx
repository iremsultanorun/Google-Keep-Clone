import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { addLabelToTodo, removeLabelFromTodo, toggleLabelFilter } from '../redux/todosSlice';
import { MdOutlineSearch } from 'react-icons/md';
import { setEditLabelModal } from '../redux/labelModalSlice';

function LabelModal({ status, todoId }) {
    const [isModal, setIsModal] = useState(false)
    const labelList = useSelector((state) => state.labelModal.labelList)
    const checkedLabels = useSelector((state) => state.todo.checkedLabels)

    const todos = useSelector((state) => {
        if (status === "create") return [];
        if (status === "selected") {
            return [
                ...state.todo.todos.filter(t => t.selected),
                ...state.todo.archiveTodos.filter(t => t.selected),
            ];
        }
        if (status === 'home') return state.todo.todos;
        if (status === 'archive') return state.todo.archiveTodos;
        if (status === 'trash') return state.todo.trashTodos;
        return state.todo.todos || [];
    });

    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")


    const currentTodo = useMemo(() => {
        if (status === "create") return null;
        if (status !== "selected") {
            return todos?.find(t => t.id === todoId);
        }
    }, [todos, todoId, status]);
    const todoLabels = currentTodo?.labels || [];

    const filteredLabels = useMemo(() => {
        if (searchText.trim() === "") {
            setIsModal(false)
            return labelList

        }
        return labelList.filter((label) => {
            return label.name.toLowerCase().includes(searchText.trim().toLowerCase())
        })
    }, [searchText, labelList])
    const handleCheckboxChange = (labelName) => {
        if (status === "create") {
            dispatch(toggleLabelFilter(labelName));
        }
        else if (todoId === null || todoId === undefined) {
            const selectedTodos = todos.filter(t => t.selected);
            const allHaveLabel = selectedTodos.every(t => t.labels?.includes(labelName));

            if (allHaveLabel) {
                dispatch(removeLabelFromTodo({
                    todoId: null,
                    label: labelName,
                    status: status
                }));
            } else {
                dispatch(addLabelToTodo({
                    todoId: null,
                    label: labelName,
                    status: status
                }));
            }
        }
        else {
            const isCurrentlyInTodo = todoLabels.includes(labelName);
            if (isCurrentlyInTodo) {
                dispatch(removeLabelFromTodo({
                    todoId: todoId,
                    label: labelName,
                    status: status
                }));
            } else {
                dispatch(addLabelToTodo({
                    todoId: todoId,
                    label: labelName,
                    status: status
                }));
            }
        }
    };
 
    const onChangeFunc = (e) => {
        setSearchText(e.target.value)
        const labelName = labelList.find(label => label.id).name
        if (labelName) {
            (searchText !== labelName) ? setIsModal(true) : setIsModal(false)
            
        }

    }


    return (
        <div className='label-modal'>
            <div className='label-modal__header'>
                <h3 className='label-modal__title'>Label note</h3>
                <div className='search-label'>
                    <input
                        className='search-label__input'
                        type="text"
                        placeholder="Enter label name"
                        value={searchText}
                        onChange={
                            onChangeFunc
                        }
                    />
                    <button className='btn sm-btn disabled'><MdOutlineSearch /></button>
                </div>
                <div>

                    {
                        filteredLabels && filteredLabels.map((label) => {
                            const isLabelChecked = (() => {
                                if (status === "create") {
                                    return checkedLabels.includes(label.name);
                                } else if (status === "selected") {
                                    const selectedTodos = todos.filter(t => t.selected);
                                    if (selectedTodos.length === 0) return false;
                                    return selectedTodos.every(t => t.labels?.includes(label.name));
                                } else {
                                    return todoLabels.includes(label.name);
                                }

                            })();

                            return (
                                <div className='label-lists'>
                                    <div key={label.id} className='label-list'>
                                        <input
                                            className='checkbox-input'
                                            type="checkbox"
                                            checked={isLabelChecked}
                                            onChange={() => handleCheckboxChange(label.name)}
                                        />
                                        <label>{label.name}</label>
                                    </div>

                                </div>
                            )
                        })
                    }


                </div>
                {
                    isModal ? <button className='create-btn btn lg-btn' onClick={() => dispatch(setEditLabelModal(true))}>Create </button> : null
                }
            </div>
        </div>
    )
}

export default LabelModal