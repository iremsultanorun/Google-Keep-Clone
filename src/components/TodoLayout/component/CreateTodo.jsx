import React, { useEffect, useRef } from 'react'
import '../css/CreateTodo.css'
import { useDispatch, useSelector } from 'react-redux'
import { showCompactForm, showFullForm, updateTodoFields, addTodo, resetForm, setNewPinnedTodo, setCreateTodoHeight,  resetBgColor } from '../../../redux/todosSlice'

import TodoActions from './TodoActions'
import Pin from '../../oparations/Pin'

function CreateTodo() {
    const dispatch = useDispatch()

    const title = useSelector((state) => state.todo.title)
    const content = useSelector((state) => state.todo.content)
    const hidden = useSelector((state) => state.todo.hidden)
    const isPinned = useSelector((state) => state.todo.isPinned)
    const todoBgColor = useSelector((state) => state.todo.todoBgColor)

    const createTodoContRef = useRef()
    const contentRef = useRef()
    const titleRef = useRef()

    const newTodo = {
        content: content,
        title: title,
        id: Date.now(),
        selected: false,
        pinned: isPinned,
        bgColor:todoBgColor,
    }
    console.log(newTodo.bgColor)

    useEffect(()=>{
        if(createTodoContRef.current){
            const createTodoHeight=createTodoContRef.current.offsetHeight
           dispatch(
            setCreateTodoHeight({
                height:createTodoHeight
            })
           )
        }
        },[newTodo.content, dispatch])

    const addTodoFunc = () => {
      
        if (title.trim() || content.trim()) {
            dispatch(addTodo(newTodo))
            dispatch(resetForm())
            contentRef.current.style.height = "20px";
        }
        dispatch(setNewPinnedTodo(false))
     dispatch(resetBgColor())
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
            // if (!createTodoContRef.current.contains(event.target)) {
            //     closeFunc();
            // };
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
            <div ref={createTodoContRef} className='createTodo__form' style={{background:newTodo.bgColor}} data-open-modal={hidden}>
                {hidden ?
                    <div className='createTodo__title-wrapper'>
                        <input
                            className='createTodo__title'
                            type="text"
                            placeholder='Title'
                            onChange={changeTitle}
                            ref={titleRef}
                            value={title} />
                            <Pin todoId={newTodo.id} status={"create"} />

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
                   <TodoActions todoId={newTodo.id} status={"create"} className={"createTodo__actions"} />
                    <div className='createTodo__btn-container'> <button className='createTodo__btn lg-btn' onClick={closeFunc}>Close</button></div>
                </div> : null}

            </div>
        </div>
    )
}

export default CreateTodo