export const  transferTodo = (state, transferTodoId, sourceKey, destinationKey) => {

    const transferTodo = state[sourceKey].find((todo) => todo.id === transferTodoId);
    if (transferTodo) {
        state[destinationKey].push(transferTodo);
    }
    state[sourceKey] = state[sourceKey].filter((todo) => todo.id !== transferTodoId);
};

export const modalControl = (state, action, modalKey, todoModalKey) => {
    const { id, status } = action.payload;

    if (status === "create" || status === "selected" || status === "todoDetail") {
        if (state[modalKey]?.status === status) {
            state[modalKey] = null;
        } else {

            state[modalKey] = { id, status };
            state[todoModalKey] = null;
        }
    } else {
        const todoList = status === 'home' ? state.todos : state.archiveTodos;
        const todo = todoList?.find((todo) => todo.id === id);

        if (todo) {

            if (state[todoModalKey] === id && state[modalKey]?.status === status) {
                state[todoModalKey] = null;
                state[modalKey] = null;
            } else {

                state[todoModalKey] = id;
                state[modalKey] = { id, status };
            }
        }
    }
}

export const getTodoListByStatus=(state,status)=>{
    switch (status) {
        case 'home':
            return state.todos
        case 'archive':
            return state.archiveTodos
        case 'trash':
            return state.trashTodos
        default:
            return []
    }
}
