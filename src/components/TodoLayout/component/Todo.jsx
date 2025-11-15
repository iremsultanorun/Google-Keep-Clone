import React, { useEffect, useRef } from 'react'
import "../css/Todo.css"
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTodo, setSelectedTodoById } from '../../../redux/todosSlice';
import Pin from '../../oparations/Pin';
import TodoActions from './TodoActions';



function Todo({ todo }) {
  console.log(todo.bgColor)
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
      style={{ border: todo.selected ? "2px solid black" : "1px solid var(--gray-200)", opacity: den ? isOpenTodoModal ? "0" : "1" : null, background:todo.bgColor }}
      data-open-modal={todoLayout}

    >
      <Pin todoId={todo.id} status={"todo"}/>

      <div className="todo__wrapper" onClick={() => dispatch(setSelectedTodoById(todo.id))} >
        <h2 className='todo__title' ref={todoTitleRef}>{baslik}</h2>
        <pre className='todo__content' ref={todoContentRef}>{content} </pre>
      </div>

      <TodoActions todoId={todo.id} status={"todo"} className={"todo__actions-wrapper"} />
      <button ref={chooseBtnRef} className="btn todo__choose-btn" onClick={selecetedTodoById}
        style={{ color: todo.selected ? "black" : "var(--gray-700)", }}
      > <i className="fa-solid fa-circle-check "></i></button>
    </div>

  )
}

export default Todo