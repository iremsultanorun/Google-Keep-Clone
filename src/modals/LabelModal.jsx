import React, { useMemo, useState } from 'react'
import { GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';

import {  addLabelToTodo, removeLabelFromTodo, setIsChecked } from '../redux/todosSlice';

function LabelModal({ status, todoId }) {
    const labelList = useSelector((state) => state.labelModal.labelList)
    const checkedLabels = useSelector((state) => state.todo.checkedLabels)

    const todos = useSelector((state) => {
        if (status === "create") return [];
        if (status === "selected") {
            return [
                ...state.todo.todos.filter(t => t.selected),
                ...state.todo.archiveNotes.filter(t => t.selected),
            ];
        }
        if (status === 'home') return state.todo.todos;
        if (status === 'archive') return state.todo.archiveNotes;
        if (status === 'trash') return state.todo.trashNotes;
        return state.todo.todos || [];
    });

    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")


    const currentTodo = useMemo(() => {
        if (status === "create") return null;
        if(status!=="selected"){
            return todos?.find(t => t.id === todoId);
        }
    }, [todos, todoId, status]);
    const todoLabels = currentTodo?.labels || [];

    const filteredLabels = useMemo(() => {
        if (searchText.trim() === "") {
            return labelList
        }
        return labelList.filter((label) => {
            return label.name.toLowerCase().includes(searchText.trim().toLowerCase())
        })
    }, [searchText, labelList])
    const handleCheckboxChange = (labelName) => {
        if (status === "create") {
            dispatch(setIsChecked(labelName));
        }
        else if (todoId === null || todoId === undefined) {  // <- Çoklu seçim
            const selectedTodos = todos.filter(t => t.selected);
            const allHaveLabel = selectedTodos.every(t => t.labels?.includes(labelName));
            
            if (allHaveLabel) {
                dispatch(removeLabelFromTodo({
                    todoId: null,
                    label: labelName,
                    status: status  // "home", "archive", "selected" hepsi çalışır
                }));
            } else {
                dispatch(addLabelToTodo({
                    todoId: null,
                    label: labelName,
                    status: status
                }));
            }
        }
        else {  // <- Tek todo
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
        console.log("id", todoId)
        console.log(
            "ststus",status
        )
    };


    return (
        <div className='label-modal'>
            <div className='label-modal__header'>
                <h3>Etiket ekle</h3>
                <div className='search-label'>
                    <input
                        type="text"
                        placeholder="Etiket ara..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <GoPencil />
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
                                        <div key={label.id} className='label-lists'>
                                            <input
                                                type="checkbox"
                                                checked={isLabelChecked}
                                                onChange={() => handleCheckboxChange(label.name)}
                                            />
                                            <label>{label.name}</label>
                                        </div>
                                    )
                                })
                            }
                        
                    
                </div>
            </div>
        </div>
    )
}

export default LabelModal