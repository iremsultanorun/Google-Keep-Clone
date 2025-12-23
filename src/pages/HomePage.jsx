import React from 'react'
import { useSelector } from 'react-redux'
import CreateTodo from '../components/TodoLayout/component/CreateTodo'
import TodoList from '../components/TodoLayout/component/TodoList'
import EmptyState from '../common/components/EmptyState'
import EmptyStateHome from '../assets/empty-state-icons/empty-state-home-icon.svg'
function HomePage() {
    const todos = useSelector((state) => state.todo.todos)
    return (
        <div style={{minHeight:"100dvh"}}>
            <CreateTodo />
            <TodoList notes={todos} status={"home"} />
    {
        todos.length===0 && <EmptyState icon={EmptyStateHome} message={"Notes that you add appear here"}/>
    }
        </div>
    )
}
export default HomePage


