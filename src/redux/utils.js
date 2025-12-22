export const transferNote = (state, action, sourceKey, destinationKey) => {
    const transferNoteId = action.payload;

    const transferNote = state[sourceKey].find((todo) => todo.id === transferNoteId);

    if ( transferNote) {
        state[destinationKey].push(transferNote);

    }
    state[sourceKey] = state[sourceKey].filter((todo) => todo.id !== transferNoteId);
};

export const modalControl = (state, action, modalKey, todoModalKey) => {
    const { id, status } = action.payload;

    if (status === "create" || status === "selected"||status==="note") {
        if (state[modalKey]?.status === status) {
            state[modalKey] = null;
        } else {
  
            state[modalKey] = { id, status };
            state[todoModalKey] = null; 
        }
    } else {
        const todoList = status === 'home' ? state.todos : state.archiveNotes;
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
