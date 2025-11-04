import React, { useEffect, useRef } from 'react'
import "../css/Todo.css"
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTodo, setSelectedTodoById } from '../../../redux/todosSlice';
import Pin from '../../oparations/Pin';
import Note from '../../../pages/Note';


function Todo({ todo }) {
  const todoLayout = useSelector((state) => state.todo.todoLayout)

  const dispatch = useDispatch();
  const baslik = todo.title
  const content = todo.content
  const todoContRef = useRef()
  const todoTitleRef = useRef()
  const todoContentRef = useRef()
  const chooseBtnRef = useRef()
  const selectedTodoId = useSelector((state) => state.todo.selectedTodoId)
  const den = selectedTodoId === todo.id
  const isOpenTodoModal = selectedTodoId !== null

  useEffect(() => {
    let a = todoTitleRef.current.clientHeight + "px"
    let b = todoContentRef.current.clientHeight + "px"
    todoContRef.current.style.height = a + b

  }, [todoTitleRef, todoContentRef])
  const selecetedTodoById = () => {
    dispatch(setSelectedTodo(todo.id))
  }
  return (

    <div className='todo__container' ref={todoContRef}
      style={{ border: todo.selected ? "2px solid black" : "1px solid var(--gray-200)", opacity: den ? isOpenTodoModal ? "0" : "1" : null }}
      data-open-modal={todoLayout}

    >
      <Pin todoId={todo.id} className="btn sm-btn fixed-btn" />

      <div className="todo__wrapper" onClick={() => dispatch(setSelectedTodoById(todo.id))} >
        <h2 className='todo__title' ref={todoTitleRef}>{baslik}</h2>
        <pre className='todo__content' ref={todoContentRef}>{content} </pre>
      </div>

        <div className='todo__actions-wrapper'>
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

     
      </div>
      <button ref={chooseBtnRef} className="btn todo__choose-btn" onClick={selecetedTodoById}
        style={{ color: todo.selected ? "black" : "var(--gray-700)", }}
      > <i className="fa-solid fa-circle-check "></i></button>
    </div>

  )
}

export default Todo