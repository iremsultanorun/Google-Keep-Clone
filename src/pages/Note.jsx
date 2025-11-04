import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pin from '../components/oparations/Pin'
import { clearSelectedTodo, updateSpecificTodo } from '../redux/todosSlice'
import "./Note.css"
function Note({ todo }) {
    const dispatch = useDispatch()
    const content = useSelector((state) => state.todo.content)

    const createTodoContRef = useRef()
    const contentRef = useRef()
    const titleRef = useRef()


    const changeTitle = (e) => {
        dispatch(updateSpecificTodo({
            id:todo.id,
            field:"title",
            value:e.target.value
        }))
    }
    const changeContent = (e) => {
        dispatch(updateSpecificTodo({
            id:todo.id,
            field:"content",
            value:e.target.value
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
        <div className='note'>
            <div ref={createTodoContRef} className='note__wrapper'
            >

            
                 <div key={todo.id} className='note__info-container'>
                 <div className='createTodo__title-wrapper'>
                       <input
                           className='createTodo__title'
                           type="text"
                           placeholder='Title'
                           onChange={changeTitle}
                           ref={titleRef}
                           value={todo.title} />
                       <Pin className="btn sm-btn fixed-btn" />
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
            
                <div className='createTodo__actions-wrapper note__actions-wrapper'>
                    <div className='createTodo__actions'>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Formatting options">
                            <i className="fa-solid fa-underline"></i>
                        </button>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Background options">
                            <i className="fa-solid fa-palette"></i>
                        </button>
                        <button className='btn action-btn sm-btn actionBtn-remind' data-tooltip-text="Remind me">
                            <i className="fa-regular fa-bell"></i>
                        </button>
                        <button className='btn action-btn sm-btn actionBtn-collaborator' data-tooltip-text="Collaborator">
                            <i className="fa-solid fa-user-plus"></i>
                        </button>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Add image">
                            <i className="fa-regular fa-image"></i>
                        </button>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Archive">
                            <i className="fa-solid fa-inbox"></i>
                        </button>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Other">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        <button className='btn action-btn sm-btn disabled' disabled={true} data-tooltip-text="Undo">
                            <i className="fa-solid fa-rotate-left"></i>
                        </button>
                        <button className='btn action-btn sm-btn disabled' disabled={true} data-tooltip-text="Rebuild">
                            <i className="fa-solid fa-rotate-right"></i>
                        </button>
                    </div>
                    <div className='createTodo__btn-container'> <button onClick={()=>  dispatch(clearSelectedTodo())} className='createTodo__btn lg-btn'>Close</button></div>
                </div>

            </div>
        </div>
    )
}

export default Note