import React, { useMemo, useState } from 'react'
import { GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { setIsChecked } from '../redux/labelModalSlice';
import { addLabelToTodo, removeLabelFromTodo } from '../redux/todosSlice';

function LabelModal({ status, todoId }) {
    const labelList = useSelector((state) => state.labelModal.labelList)
    const checkedLabels = useSelector((state) => state.labelModal.checkedLabels)
    
    const todos = useSelector((state) => {
        if(status==="create") return []
        if (status === 'home') return state.todo.todos; 
        if (status === 'archive') return state.todo.archiveNotes; 
        if (status === 'trash') return state.todo.trashNotes;
        return state.todo.todos || [];
    });
    
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")
    

    const currentTodo = useMemo(() => {
        if (status === "create") return null;
        return todos?.find(t => t.id === todoId);
    }, [todos, todoId,status]);
    console.log(currentTodo)
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
        if (status === "create" || !todoId) {
            dispatch(setIsChecked(labelName));
        }
        else  { if (todoId && status) {
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
    }
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
                            const isLabelChecked =  status === "create" || !todoId
                                ?  checkedLabels.includes(label.name)
                               : todoLabels.includes(label.name)
                                

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