import { createSlice } from "@reduxjs/toolkit";
import { modalControl, transferNote } from "./utils"
const initialState = {
    title: "",
    content: "",
    hidden: false,
    todos: [],
    trashNotes: [],
    remindersNotes: [],
    archiveNotes: [],
    selectedCurrent: 0,
    todoLayout: false,
    selectedTodoId: null,
    openModalTodoId: null,
    isPinned: false,
    todoDetailHeight: {},
    createTodoHeight: {},
    todoBgColor: " ",
    isOthersModal: null,
    isBgPaletteModal:  null,
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {

        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },

        updateTodoFields: (state, action) => {
            if (action.payload.title !== undefined)
                state.title = action.payload.title
            if (action.payload.content !== undefined)
                state.content = action.payload.content
            if (action.payload.dateHours !== undefined)
                state.dateHours = action.payload.dateHours
        },

        updateSpecificTodo: (state, action) => {
            const { id, field, value } = action.payload

            const todoIndex = state.todos.findIndex((todo) => id === todo.id)
            if (todoIndex !== -1) {
                state.todos[todoIndex][field] = value
            }
        },
        setSelectedTodoById: (state, action) => {
            state.selectedTodoId = action.payload
        },

        clearSelectedTodo: (state) => {
            state.selectedTodoId = null;
        },
        clearSelectedTodos: (state) => {
            state.todos.forEach(todo => {
                if (todo.selected) {
                    todo.selected = false;
                }
            });
            state.selectedCurrent = 0;
        },
        showFullForm: (state) => {
            state.hidden = false
        },
        showCompactForm: (state) => {
            state.hidden = true
        },
        resetForm: (state) => {
            state.content = ""
            state.title = ""
        },

        setSelectedTodo: (state, action) => {
            const { selectId, status } = action.payload
            const todoList = 
            status === 'home' 
            ? state.todos 
            :status === 'archive' 
            ? state.archiveNotes 
            : status==="trash"
            ? state.trashNotes:null

            const todoSelected = todoList.find((todo) => (todo.id) === selectId)

            if (todoSelected) {
                todoSelected.selected = !todoSelected.selected
                if (todoSelected.selected == true) {
                    state.selectedCurrent += 1
                }
                if (todoSelected.selected == false) {
                    state.selectedCurrent -= 1
                }
            }
        },
        setPinnedTodo: (state, action) => {
            const { pinnedId, status } = action.payload
            const todoList = status === 'home' ? state.todos :
                status === 'archive' ? state.archiveNotes : null;

            const todoPinned = todoList.find((todo) => todo.id === pinnedId)
            if (todoPinned) {
                todoPinned.pinned = !todoPinned.pinned
            }
        },
        setAllPinnedTodo: (state) => {
            state.todos.forEach((todo) => {
                if (todo.selected == true) {
                    todo.pinned = !todo.pinned
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })
            state.archiveNotes.forEach((todo) => {
                if (todo.selected == true) {
                    todo.pinned = !todo.pinned
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

        },

        setNewPinnedTodo: (state, action) => {
            state.isPinned = action.payload
        },

        setTodoLayout: (state) => {
            state.todoLayout = !state.todoLayout;
        },

        setIsOthersModal: (state, action) => {
            modalControl(state,action,"isOthersModal","openModalTodoId")
        },

        setDeleteTodo: (state, action) => {
            transferNote(state, action, "todos", "trashNotes")
        },
        setDeleteArchive: (state, action) => {
            transferNote(state, action, "archiveNotes", "trashNotes")
        },
        setAllDeleteTodo: (state) => {
            const deleteNoteId = state.todos.filter(todo => todo.selected !== todo).map(todo => todo.id)
            state.todos.forEach((todo) => {
                if (todo.selected === true)
                    state.trashNotes.push(todo)
            })
            state.todos = state.todos.filter((todo) => !deleteNoteId(todo.id))
        },
        setRestoreTrash: (state, action) => {
            transferNote(state, action, "trashNotes", "todos")
        },
        setRestoreArchive: (state, action) => {
            transferNote(state, action, "archiveNotes", "todos")
        },
        setArchiveTodo: (state, action) => {
            transferNote(state, action, "todos", "archiveNotes")
            state.selectedTodoId = null;
        },
        setNewArchiveTodo: (state) => {
            const newArchiveTodo = {
                content: state.content,
                title: state.title,
                id: Date.now(),
                selected: false,
                pinned: false,
                bgColor: state.todoBgColor
            }
            state.archiveNotes.push(newArchiveTodo)
            state.content = ""
            state.title = ""
            state.hidden = false
        },
        setAllArchiveTodo: (state) => {
            const selectedId = state.todos.filter((todo) => todo.selected).map(todo => todo.id)
            state.todos.forEach((todo) => {
                if (todo.selected) {
                    state.archiveNotes.push(todo)
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

            state.todos = state.todos.filter((todo) => !selectedId.includes(todo.id))

        },
        setAllRestoreArchiveTodo: (state) => {
            const selectedId = state.archiveNotes.filter((todo) => todo.selected).map(todo => todo.id)
            state.archiveNotes.forEach((todo) => {
                if (todo.selected) {
                    state.todos.push(todo)
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

            state.archiveNotes = state.archiveNotes.filter((todo) => !selectedId.includes(todo.id))

        },
        setTodoDetailHeight: (state, action) => {
            const { todoId, height } = action.payload
            state.todoDetailHeight[todoId] = height
        },
        setCreateTodoHeight: (state, action) => {
            const { height } = action.payload
            state.createTodoHeight = height
        },

        setIsBgPaletteModal: (state,action) => {
            modalControl(state,action,"isBgPaletteModal","openModalTodoIdd")
        },

        setBgColor: (state, action) => {
            const { color, status, id } = action.payload
            if (status == "create") { state.todoBgColor = color }
            if (status == "home" || status == "note") {
                const todoIndex = state.todos.findIndex((todo) => todo.id === id)
                state.todos[todoIndex].bgColor = color
            }
            if (status == "archive") {
                const todoIndex = state.archiveNotes.findIndex((todo) => todo.id === id)
                state.archiveNotes[todoIndex].bgColor = color
            }
        },
        setAllBgColor: (state, action) => {
            const { color, status } = action.payload;
            if (status !== "archive") {
                state.todos.forEach((todo) => {
                    if (todo.selected === true) {
                        todo.bgColor = color;
                    }
                });
            }
            state.archiveNotes.forEach((todo) => {
                if (todo.selected === true) {
                    todo.bgColor = color;
                }
            });


        },
        resetBgColor: (state, action) => {
            const { todoId, status } = action.payload;
            let todoList;
            if (status === "home") {
                todoList = state.todos
            } if (status === "archive") {
                todoList = state.archiveNotes
            }
            if (status === "create") {
                state.todoBgColor = "white";
            } else {
                const todo = todoList.find(todo => todo.id === todoId)
                if (todo) {
                    todo.bgColor = "white"
                }
            }
        },
        resetAllBgColor: (state) => {
            state.todos.forEach((todo) => {
                if (todo.selected === true) {
                    todo.bgColor = "white";
                }
            });

        },
        addLabelToTodo: (state, action) => {
            const { todoId, label, status } = action.payload;


            const todoList = status === 'home' ? state.todos :
                status === 'archive' ? state.archiveNotes :
                    state.trashNotes;


            const todo = todoList.find(t => t.id === todoId);

            if (todo) {

                if (!todo.labels.includes(label)) {
                    todo.labels.push(label);
                }
            }
        },

        removeLabelFromTodo: (state, action) => {
            const { todoId, label, status } = action.payload;

            const todoList = status === 'home' ? state.todos :
                status === 'archive' ? state.archiveNotes :
                    state.trashNotes;

            const todo = todoList.find(t => t.id === todoId);

            if (todo) {
                todo.labels = todo.labels.filter(l => l !== label);
            }
        }
    }

}
) 

export const { updateTodoFields, showFullForm, showCompactForm, addTodo, resetForm, setSelectedTodo, setPinnedTodo, setTodoLayout, updateSpecificTodo, setSelectedTodoById, clearSelectedTodo, setIsOthersModal, setDeleteTodo, setArchiveTodo, setNewPinnedTodo, clearSelectedTodos, setAllPinnedTodo, setTodoDetailHeight, setCreateTodoHeight, setIsBgPaletteModal, setBgColor, resetBgColor, setAllBgColor, resetAllBgColor, setAllArchiveTodo, setAllDeleteTodo, setNewArchiveTodo, setRestoreTrash, setRestoreArchive, setDeleteArchive, addLabelToTodo, removeLabelFromTodo, setAllRestoreArchiveTodo } = todoSlice.actions

export default todoSlice.reducer