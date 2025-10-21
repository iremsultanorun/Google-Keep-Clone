import React, { useEffect, useRef } from 'react'
import "../css/Todo.css"
import { useDispatch } from 'react-redux'
import {setSelectTodo } from '../../../redux/todosSlice';


function Todo({ todo }) {

  const dispatch = useDispatch();
  const baslik = todo.title
  const content = todo.content
  const todoContRef = useRef()
  const todoTitleRef = useRef()
  const todoContentRef = useRef()
  const chooseBtnRef = useRef()


  useEffect(() => {
    let a = todoTitleRef.current.clientHeight + "px"
    let b = todoContRef.current.clientHeight + "px"
    todoContRef.current.style.height = a + b

  }, [todoTitleRef, todoContentRef])
  const selecetedTodoById = () => {
    dispatch(setSelectTodo(todo.id))
  }
  return (

    <div className='todo__container' ref={todoContRef}
    style={{border: todo.selected ? "2px solid black" : "1px solid var(--gray-200)"}}
    >

      <h2 className='todo__title' ref={todoTitleRef}>{baslik}</h2>
      <pre className='todo__content' ref={todoContentRef}>{content} </pre>
      <div className='deneme'>
        <div> fkdfk </div>
        <div>fklfdkl</div>
      </div>
      <button ref={chooseBtnRef} className="btn todo__choose-btn" onClick={selecetedTodoById}
      style={{color: todo.selected ? "black" : "var(--gray-700)",}}
      > <i className="fa-solid fa-circle-check "></i></button>
    </div>

  )
}

export default Todo