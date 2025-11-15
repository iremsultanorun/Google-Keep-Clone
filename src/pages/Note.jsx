import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pin from '../components/oparations/Pin'
import { clearSelectedTodo, setTodoDetailHeight, updateSpecificTodo } from '../redux/todosSlice'
import "./Note.css"
import TodoActions from '../components/TodoLayout/component/TodoActions'
function Note({ todo }) {
    const dispatch = useDispatch()
    const content = useSelector((state) => state.todo.content)
    const createTodoContRef = useRef()
    const contentRef = useRef()
    const titleRef = useRef()
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

    return (
        <div className='note' >
            <div ref={createTodoContRef} className='note__wrapper'  style={{background:todo.bgColor}}>
                <div className='note__scroll-area'>
                    <div key={todo.id} className='note__info-container'>
                        <div className='createTodo__title-wrapper'>
                            <input
                                className='createTodo__title'
                                type="text"
                                placeholder='Title'
                                onChange={changeTitle}
                                ref={titleRef}
                                value={todo.title} />
                            <Pin todoId={todo.id}  status={"note"} />
                        </div>
                        <div className='createTodo__content-wrapper'>
                            <textarea
                                ref={contentRef}
                                className='createTodo__content' type="text"
                                placeholder='Take a note...'
                                onChange={changeContent}
                                value={todo.content}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className='createTodo__actions-wrapper note__actions-wrapper'>
                    <TodoActions todoId={todo.id} status={"note"} className={"createTodo__actions"} />
                    <div className='createTodo__btn-container'> <button onClick={() => dispatch(clearSelectedTodo())} className='createTodo__btn lg-btn'>Close</button></div>
                </div>

            </div>
        </div>
    )
}

export default Note