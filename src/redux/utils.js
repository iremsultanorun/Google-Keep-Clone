import { FaLinesLeaning } from "react-icons/fa6";

export const transferNote = (state, action, sourceKey, destinationKey) => {
    const transferNoteId = action.payload;

    const transferNote = state[sourceKey].find((todo) => todo.id === transferNoteId);

    if ( transferNote) {
        state[destinationKey].push(transferNote);

    }
    state[sourceKey] = state[sourceKey].filter((todo) => todo.id !== transferNoteId);
};

// export const bgColor=(state,action)=>{
//  const { color, status, id } = action.payload
//         if (status == "create") { state.todoBgColor = color }
//         if (status == "todo" || status == "note") {
//             const todoIndex = state.todos.findIndex((todo) => todo.id === id)
//             state.todos[todoIndex].bgColor = color
//         }
    
// }

