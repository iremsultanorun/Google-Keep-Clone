import React, { useEffect, useRef } from 'react'
import "../css/Todo.css"
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTodo, setSelectedTodoById } from '../../../redux/todosSlice';

import Actions from '../../../common/Actions/Actions';
import Pin from '../../../common/Actions/Action-buttons/Pin';
import { IoIosCheckmarkCircle } from 'react-icons/io';




function Todo({ todo, status, type }) {
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
    dispatch(setSelectedTodo({ selectId: todo.id, status: status }))
  }
  console.log(todo.labels)
  return (

    <div className='todo__container' ref={todoContRef}
      style={{ border: todo.selected ? "2px solid black" : "1px solid var(--color-gray-200)", opacity: den ? isOpenTodoModal ? "0" : "1" : null, background: todo.bgColor }}
      data-open-modal={todoLayout}

    >
      {
        status !== "trash" && <Pin todoId={todo.id} status={status} />
      }

      <div className="todo__wrapper" onClick={() => dispatch(setSelectedTodoById(todo.id, status))} >
        <h2 className='todo__title' ref={todoTitleRef}>{baslik}</h2>
        <pre className='todo__content' ref={todoContentRef}>{content} </pre>
      </div>
      {
        todo.labels?.map((label,id) => (
          <p key={id}> {label} </p>
        ))

      }
      <Actions todoId={todo.id} status={status} type={type} className={"todo__actions-wrapper"} />
      {status !== "trash" &&
        <button ref={chooseBtnRef} className="btn todo__choose-btn" onClick={selecetedTodoById}
          style={{ color: todo.selected ? "black" : "var(--color-gray-700)", }}
        > <IoIosCheckmarkCircle /></button>
      }
    </div>

  )
}

export default Todo