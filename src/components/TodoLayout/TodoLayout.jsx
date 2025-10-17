import React from 'react'
import CreateTodo from "./component/CreateTodo"
import TodoList from "./component/TodoList"

function TodoLayout() {
  return (
   <div>
<CreateTodo/>
<TodoList/>
   </div>
        
    
  )
}

export default TodoLayout