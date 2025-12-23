import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { closeTodoDetail, resetBgColor, openTodoOptions, setTodoDetailHeight, updateActiveTodo } from '../redux/todosSlice'
import "./css/TodoDetail.css"

import Pin from '../common/Actions/Action-buttons/Pin'
import Actions from '../common/Actions/Actions'
function TodoDetail({ todo }) {
    const dispatch = useDispatch()
    const content = useSelector((state) => state.todo.content)
    const archiveTodos = useSelector((state) => state.todo.archiveTodos)
    const trashTodos = useSelector((state) => state.todo.trashTodos)
    const todos = useSelector((state) => state.todo.todos)
    const createTodoContRef = useRef()
    const contentRef = useRef()
    const titleRef = useRef()
    let actualStatus = "todoDetail";
    if (trashTodos.some(t => t.id === todo.id)) {
        actualStatus = "trash";
    } else if (archiveTodos.some(t => t.id === todo.id)) {
        actualStatus = "archive";
    } else if (todos.some(t => t.id === todo.id)) {
        actualStatus = "home";
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
        dispatch(updateActiveTodo({
            id: todo.id,
            field: "title",
            value: e.target.value
        }))
    }
    const changeContent = (e) => {
        dispatch(updateActiveTodo({
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
                dispatch(closeTodoDetail())
                dispatch(openTodoOptions({ id: null, status: "todoDetail" }))
                dispatch(resetBgColor({ id: todo.id, status: "todoDetail" }))
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dispatch,todo.id])

    return (
        <div className='todoDetail'>
            <div ref={createTodoContRef} className='todoDetail__wrapper' style={{ background: todo.bgColor }}>
                <div className='todoDetail__scroll-area'>
                    {

                        <div key={todo.id} className='todoDetail__info-container' onClick={handleClick}>
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
                                    <Pin todoId={todo.id} status={"todoDetail"} />
                                }
                            </div>
                            <div className='createTodo__content-wrapper'>
                                <textarea
                                    ref={contentRef}
                                    className='createTodo__content' type="text"
                                    placeholder='Take a todoDetail...'
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
                        actualStatus === "trash" && <p className='todoDetail__location'>todoDetail is in Trash</p>
                    }
                    {
                        actualStatus === "archive" && <p className='todoDetail__location'>todoDetail is in Archive</p>
                    }

                </div>
                <div className='createTodo__actions-wrapper todoDetail__actions-wrapper'>
                    <Actions todoId={todo.id} status={actualStatus}  istodoDetailComponent={true}  className={"createTodo__actions"}
                    />
                    {
                        actualStatus !== "trash" &&
                        <div className='createTodo__btn-container'> <button onClick={() => dispatch(closeTodoDetail())} className='createTodo__btn lg-btn'>Close</button></div>
                    }
                </div>

            </div>
        </div>
    )
}

export default TodoDetail