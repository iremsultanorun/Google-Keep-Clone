import React, { useEffect, useRef } from 'react'
import '../css/CreateTodo.css'
import { useDispatch, useSelector } from 'react-redux'
import { showCompactForm, showFullForm, updateTodoFields, addTodo, resetForm } from '../../../redux/todosSlice'
import Pin from '../../oparations/Pin'
function CreateTodo() {
    const dispatch = useDispatch()

    const title = useSelector((state) => state.todo.title)
    const content = useSelector((state) => state.todo.content)
    const hidden = useSelector((state) => state.todo.hidden)

    const createTodoContRef = useRef()
    const contentRef = useRef()
    const titleRef = useRef()

    const newTodo = {
        content: content,
        title: title,
        id: Date.now(),
        selected: false,
        pinned: false,
    }

    const addTodoFunc = () => {
        if (title.trim() || content.trim()) {
            dispatch(addTodo(newTodo))
            dispatch(resetForm())
            contentRef.current.style.height = "20px";
        }
    }
    const closeFunc = () => {
        addTodoFunc()
        dispatch(showFullForm(hidden))
    }



    const changeTitle = (e) => {
        dispatch(updateTodoFields({ title: e.target.value }))
    }
    const changeContent = (e) => {
        dispatch(updateTodoFields({ content: e.target.value }))
    }




    useEffect(() => {
        const handleFormClick = (event) => {
            if (createTodoContRef.current.contains(event.target)) {
                dispatch(showCompactForm(hidden));
            };
            if (!createTodoContRef.current.contains(event.target)) {
                closeFunc();
            };
        }
        window.addEventListener("click", handleFormClick);
        return () => {
            window.removeEventListener("click", handleFormClick)
        }
    }, [hidden, dispatch, closeFunc])

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
    }, [hidden])

    return (
        <div className='createTodo'>
            <div ref={createTodoContRef} className='createTodo__form'>
                {hidden ?
                    <div className='createTodo__title-wrapper'>

                        <input
                            className='createTodo__title'
                            type="text"
                            placeholder='Title'
                            onChange={changeTitle}
                            ref={titleRef}
                            value={title} />
                        <Pin className="btn sm-btn fixed-btn" />
                    </div>
                    : null}


                <div className='createTodo__content-wrapper'>
                    <textarea
                        ref={contentRef}
                        onClick={() => dispatch(showCompactForm(hidden))}
                        className='createTodo__content' type="text"
                        placeholder='Take a note...'
                        onChange={changeContent}
                        value={content}
                        style={{ marginTop: hidden ? "10px" : "0" }}></textarea>
                    {hidden ? null :
                        <div className='node-type-wrapper'>
                            <button className="note-type-btn btn md-btn" data-tooltip-text="New list">
                                <i className="fa-regular fa-square-check"></i>
                            </button>
                            <button className="note-type-btn btn md-btn" data-tooltip-text="New note with drawing">
                                <i className="fa-solid fa-paintbrush"></i>
                            </button>
                            <button className="note-type-btn btn md-btn" data-tooltip-text="New note with picture">
                                <i className="fa-regular fa-image"></i>
                            </button>
                        </div>}

                </div>
                {hidden ? <div className='createTodo__actions-wrapper'>
                    <div className='createTodo__actions'>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Formatting options">
                            <i className="fa-solid fa-underline"></i>
                        </button>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Background options">
                            <i className="fa-solid fa-palette"></i>
                        </button>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Remind me">
                            <i className="fa-regular fa-bell"></i>
                        </button>
                        <button className='btn action-btn sm-btn' data-tooltip-text="Collaborator">
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
                    <button className='createTodo__btn lg-btn' onClick={closeFunc}>Close</button>
                </div> : null}

            </div>
        </div>
    )
}

export default CreateTodo