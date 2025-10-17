import React, { useEffect, useRef } from 'react'
import "../css/Todo.css"


function Todo({ todo }) {

  console.log(todo);
  const baslik = todo.title
  const content = todo.content
  const todoContRef = useRef()
  const todoTitleRef = useRef()
  const todoContentRef = useRef()

  useEffect(() => {
    let a = todoTitleRef.current.clientHeight + "px"
    let b = todoContRef.current.clientHeight + "px"
    todoContRef.current.style.height = a + b

  }, [todoTitleRef, todoContentRef])



  return (

    <div className='todo__container' ref={todoContRef} >
      <h2 className='todo__title' ref={todoTitleRef}>{baslik}</h2>
      <pre className='todo__content' ref={todoContentRef}>{content} </pre>
    </div>

  )
}

export default Todo