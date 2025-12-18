import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearSelectedTodo, resetBgColor, setIsOthersModal, setTodoDetailHeight, updateSpecificTodo } from '../redux/todosSlice'
import "./css/Note.css"

import Pin from '../common/Actions/Action-buttons/Pin'
import Actions from '../common/Actions/Actions'
function Note({ todo }) {
    const dispatch = useDispatch()
    const content = useSelector((state) => state.todo.content)
    const archiveNotes = useSelector((state) => state.todo.archiveNotes)
    const trashNotes = useSelector((state) => state.todo.trashNotes)
    const todos = useSelector((state) => state.todo.todos)
    const createTodoContRef = useRef()
    const contentRef = useRef()
    const titleRef = useRef()
    let actualStatus = "note";
    if (trashNotes.some(t => t.id === todo.id)) {
        actualStatus = "trash";
    } else if (archiveNotes.some(t => t.id === todo.id)) {
        actualStatus = "archive";
    } else if (todos.some(t => t.id === todo.id)) {
        actualStatus = "note";
    }
    const handleClick = () => {
        if (actualStatus === "trash") {
            alert("çöp kutusunda düzenlenemez")
        }

    }
    useEffect(() => {
        if (createTodoContRef.current) {
            const todoDetailHeight = createTodoContRef.current.offsetHeight
            dispatch(
                setTodoDetailHeight({
                    todoId: todo.id,
                    height: todoDetailHeight
                })
            )
        }
    }, [todo.content, todo.id, dispatch])
    const changeTitle = (e) => {
        dispatch(updateSpecificTodo({
            id: todo.id,
            field: "title",
            value: e.target.value
        }))
    }
    const changeContent = (e) => {
        dispatch(updateSpecificTodo({
            id: todo.id,
            field: "content",
            value: e.target.value
        }))
    }

    useEffect(() => {
        if (contentRef.current.value !== " ") {
            contentRef.current.style.height = contentRef.current.scrollHeight + "px"
        }
    }, [content])


    function increaseTextarea(event) {
        event.target.style.height = event.target.scrollHeight + "px"
    }

    function decreaseTextarea(event) {
        event.target.style.height = "20px";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    useEffect(() => {
        contentRef.current.addEventListener("keydown", (e) => {
            if (e.code == "Enter") {
                increaseTextarea(event)
            }
            if (e.code == "Backspace") {
                decreaseTextarea(event)
            }
        })
    }, [])

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.addEventListener("keydown", (e) => {
                if (e.code == "Enter") {
                    contentRef.current.focus();
                }
            })
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (createTodoContRef.current && !createTodoContRef.current.contains(e.target)) {
                dispatch(clearSelectedTodo())
                dispatch(setIsOthersModal({ id: null, status: "note" }))
                dispatch(resetBgColor({ id: todo.id, status: "note" }))
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dispatch])

    return (
        <div className='note'>
            <div ref={createTodoContRef} className='note__wrapper' style={{ background: todo.bgColor }}>
                <div className='note__scroll-area'>
                    {

                        <div key={todo.id} className='note__info-container' onClick={handleClick}>
                            <div className='createTodo__title-wrapper'>
                                <input
                                    className='createTodo__title'
                                    type="text"
                                    placeholder='Title'
                                    onChange={changeTitle}
                                    ref={titleRef}
                                    value={todo.title}
                                    disabled={actualStatus === "trash"}
                                />
                                {
                                    actualStatus !== "trash" &&
                                    <Pin todoId={todo.id} status={"note"} />
                                }
                            </div>
                            <div className='createTodo__content-wrapper'>
                                <textarea
                                    ref={contentRef}
                                    className='createTodo__content' type="text"
                                    placeholder='Take a note...'
                                    onChange={changeContent}
                                    value={todo.content}
                                    disabled={actualStatus === "trash"}
                                ></textarea>
                            </div>
                        </div>
                    }
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>

                    {
                        actualStatus === "trash" && <p className='note__location'>Note is in Trash</p>
                    }
                    {
                        actualStatus === "archive" && <p className='note__location'>Note is in Archive</p>
                    }

                </div>
                <div className='createTodo__actions-wrapper note__actions-wrapper'>
                    <Actions todoId={todo.id} status={actualStatus} className={"createTodo__actions"}
                    />
                    {
                        actualStatus !== "trash" &&
                        <div className='createTodo__btn-container'> <button onClick={() => dispatch(clearSelectedTodo())} className='createTodo__btn lg-btn'>Close</button></div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Note