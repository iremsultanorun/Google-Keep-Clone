import React from 'react'
import { useSelector } from 'react-redux'
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'

function HomePage() {
    const todos = useSelector((state) => state.todo.todos)
    return (
        <div>
            <CreateTodo />
            <TodoList notes={todos} status={"home"} />
        </div>
    )
}
export default HomePage


